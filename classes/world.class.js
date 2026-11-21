class World {
    /**
     * Creates level, Pepe and status bars and starts the game logic and drawing loop.
     * @param {HTMLCanvasElement} canvas - the game area
     * @param {Keyboard} keyboard - state of the game keys
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.keyboard = keyboard;
        this.level = createLevel1();
        this.character = new Character();
        this.throwableObjects = [];
        this.cameraX = 0;
        this.throwCooldown = 0;
        this.isRunning = true;
        this.createStatusBars();
        this.character.setWorld(this);
        this.level.endboss.setWorld(this);
        this.run();
        this.draw();
    }


    /**
     * Creates the status bars for health, coins, bottles and the final boss.
     */
    createStatusBars() {
        this.healthBar = new StatusBar("health", 10, 0, 100);
        this.coinBar = new StatusBar("coin", 10, 45, 0);
        this.bottleBar = new StatusBar("bottle", 10, 90, 0);
        this.endbossBar = new StatusBar("endboss", 260, 5, 100);
    }


    /**
     * Starts the game logic with 60 checks per second.
     */
    run() {
        setStoppableInterval(() => this.update(), 1000 / 60);
    }


    /**
     * Runs all checks of one game step.
     */
    update() {
        this.checkEnemyCollisions();
        this.checkEndbossCollision();
        this.checkCollectables();
        this.checkThrow();
        this.checkBottleHits();
        this.removeFinishedObjects();
        this.checkGameEnd();
    }


    /**
     * Defeats enemies when Pepe lands on them from above, otherwise the contact hurts Pepe.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead() || !this.character.isColliding(enemy)) {
                return;
            }
            if (this.character.isStomping(enemy)) {
                enemy.die();
                this.character.bounce();
            } else {
                this.hurtCharacter(20);
            }
        });
    }


    /**
     * Hurts Pepe when he touches the living final boss.
     */
    checkEndbossCollision() {
        const endboss = this.level.endboss;
        if (!endboss.isDead() && this.character.isColliding(endboss)) {
            this.hurtCharacter(40);
        }
    }


    /**
     * Takes health from Pepe unless he is already hurt.
     * @param {number} damage - energy to subtract
     */
    hurtCharacter(damage) {
        if (this.character.isHurt() || this.character.isDead()) {
            return;
        }
        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
        soundManager.play("hurt");
        if (!this.character.isDead()) {
            soundManager.playVoice("voiceHurt");
        }
    }


    /**
     * Collects coins and bottles that Pepe touches.
     */
    checkCollectables() {
        this.level.coins.forEach((coin) => {
            if (!coin.isCollected && this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (!bottle.isCollected && this.character.bottles < 5 && this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }


    /**
     * Counts a coin and updates the coin bar.
     * @param {Coin} coin - the collected coin
     */
    collectCoin(coin) {
        coin.isCollected = true;
        this.character.coins++;
        this.coinBar.setPercentage(this.character.coins / this.level.coinCount * 100);
        soundManager.play("coin");
        if (this.character.coins === this.level.coinCount) {
            soundManager.playVoice("voiceCoins");
        }
    }


    /**
     * Counts a bottle and updates the bottle bar.
     * @param {Bottle} bottle - the collected bottle
     */
    collectBottle(bottle) {
        bottle.isCollected = true;
        this.character.bottles++;
        this.bottleBar.setPercentage(this.character.bottles * 20);
        soundManager.play("bottlePickup");
    }


    /**
     * Throws a bottle if the throw key is pressed and the cooldown is over.
     */
    checkThrow() {
        if (this.throwCooldown > 0) {
            this.throwCooldown--;
            return;
        }
        const wantsToThrow = this.keyboard.throwBottle || this.keyboard.throwTapped;
        if (wantsToThrow && this.character.bottles > 0 && !this.character.isDead()) {
            this.throwBottle();
        }
        this.keyboard.throwTapped = false;
    }


    /**
     * Creates a flying bottle in the direction Pepe is facing.
     */
    throwBottle() {
        const character = this.character;
        const x = character.otherDirection ? character.x : character.x + 60;
        this.throwableObjects.push(new ThrowableObject(x, character.y + 100, character.otherDirection));
        character.bottles--;
        this.bottleBar.setPercentage(character.bottles * 20);
        this.throwCooldown = 30;
        soundManager.play("throw");
        soundManager.playVoice("voiceThrow");
    }


    /**
     * Checks for every flying bottle whether it hits an enemy.
     */
    checkBottleHits() {
        this.throwableObjects.forEach((bottle) => {
            this.hitEnemiesWith(bottle);
            this.hitEndbossWith(bottle);
        });
    }


    /**
     * Defeats a regular chicken that is hit by the bottle.
     * @param {ThrowableObject} bottle - the flying bottle
     */
    hitEnemiesWith(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (!bottle.isSplashing && !enemy.isDead() && bottle.isColliding(enemy)) {
                enemy.die();
                bottle.splash();
            }
        });
    }


    /**
     * Damages the final boss when the bottle hits it.
     * @param {ThrowableObject} bottle - the flying bottle
     */
    hitEndbossWith(bottle) {
        const endboss = this.level.endboss;
        if (bottle.isSplashing || endboss.isDead() || !bottle.isColliding(endboss)) {
            return;
        }
        bottle.splash();
        endboss.hit(20);
        endboss.hadFirstContact = true;
        this.endbossBar.setPercentage(endboss.energy);
        soundManager.play("bossHurt");
    }


    /**
     * Removes defeated enemies, collected items and burst bottles.
     */
    removeFinishedObjects() {
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isRemovable);
        this.level.coins = this.level.coins.filter((coin) => !coin.isCollected);
        this.level.bottles = this.level.bottles.filter((bottle) => !bottle.isCollected);
        this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.isRemovable);
    }


    /**
     * Ends the game as soon as Pepe or the final boss is defeated.
     */
    checkGameEnd() {
        if (this.character.isDeadAnimationDone()) {
            endGame(false);
        } else if (this.level.endboss.isDeadAnimationDone()) {
            endGame(true);
        }
    }


    /**
     * Redraws all objects with the camera offset and requests the next frame.
     */
    draw() {
        if (!this.isRunning) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.drawBackground();
        this.drawLevelObjects();
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.cameraX, 0);
        this.drawStatusBars();
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws the sky, clouds and landscape.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.sky);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.landscape);
    }


    /**
     * Draws the coins, bottles and all enemies of the level.
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
    }


    /**
     * Draws the status bars fixed on the screen, the final boss bar only after the first contact.
     */
    drawStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.level.endboss.hadFirstContact) {
            this.addToMap(this.endbossBar);
        }
    }


    /**
     * Draws all objects of a list.
     * @param {DrawableObject[]} objects - the objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }


    /**
     * Draws a single object, mirrored when it faces left.
     * @param {DrawableObject} object - the object to draw
     */
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }


    /**
     * Mirrors the drawing area so the object faces left.
     * @param {MovableObject} object - the object to mirror
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    /**
     * Restores x and the drawing area after mirroring.
     * @param {MovableObject} object - the mirrored object
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }
}
