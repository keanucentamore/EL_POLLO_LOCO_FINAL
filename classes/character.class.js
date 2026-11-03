class Character extends MovableObject {
    /**
     * Loads Pepe's images and places him at the start with full start values.
     */
    constructor() {
        super();
        this.loadAllImages();
        this.x = 100;
        this.y = 180;
        this.groundY = 180;
        this.width = 127;
        this.height = 250;
        this.speed = 5;
        this.offset = { top: 100, right: 25, bottom: 12, left: 25 };
        this.coins = 0;
        this.bottles = 0;
        this.idleTicks = 0;
    }


    /**
     * Loads the frames of all animations into the image cache.
     */
    loadAllImages() {
        this.imagesIdle = this.getIdleImages();
        this.imagesLongIdle = this.getLongIdleImages();
        this.imagesWalking = this.getWalkingImages();
        this.imagesJumping = this.getJumpingImages();
        this.imagesHurt = this.getHurtImages();
        this.imagesDead = this.getDeadImages();
        this.loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    }


    /**
     * Returns the frames of the idle animation.
     * @returns {string[]} paths of the ten idle frames
     */
    getIdleImages() {
        return [
            "./assets/images/2_character_pepe/1_idle/idle/I-1.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-2.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-3.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-4.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-5.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-6.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-7.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-8.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-9.png",
            "./assets/images/2_character_pepe/1_idle/idle/I-10.png"
        ];
    }


    /**
     * Returns the frames of the sleeping animation.
     * @returns {string[]} paths of the ten sleeping frames
     */
    getLongIdleImages() {
        return [
            "./assets/images/2_character_pepe/1_idle/long_idle/I-11.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-12.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-13.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-14.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-15.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-16.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-17.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-18.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-19.png",
            "./assets/images/2_character_pepe/1_idle/long_idle/I-20.png"
        ];
    }


    /**
     * Returns the frames of the walking animation.
     * @returns {string[]} paths of the six walking frames
     */
    getWalkingImages() {
        return [
            "./assets/images/2_character_pepe/2_walk/W-21.png",
            "./assets/images/2_character_pepe/2_walk/W-22.png",
            "./assets/images/2_character_pepe/2_walk/W-23.png",
            "./assets/images/2_character_pepe/2_walk/W-24.png",
            "./assets/images/2_character_pepe/2_walk/W-25.png",
            "./assets/images/2_character_pepe/2_walk/W-26.png"
        ];
    }


    /**
     * Returns the frames of the jumping animation.
     * @returns {string[]} paths of the nine jumping frames
     */
    getJumpingImages() {
        return [
            "./assets/images/2_character_pepe/3_jump/J-31.png",
            "./assets/images/2_character_pepe/3_jump/J-32.png",
            "./assets/images/2_character_pepe/3_jump/J-33.png",
            "./assets/images/2_character_pepe/3_jump/J-34.png",
            "./assets/images/2_character_pepe/3_jump/J-35.png",
            "./assets/images/2_character_pepe/3_jump/J-36.png",
            "./assets/images/2_character_pepe/3_jump/J-37.png",
            "./assets/images/2_character_pepe/3_jump/J-38.png",
            "./assets/images/2_character_pepe/3_jump/J-39.png"
        ];
    }


    /**
     * Returns the frames of the hurt animation.
     * @returns {string[]} paths of the three hurt frames
     */
    getHurtImages() {
        return [
            "./assets/images/2_character_pepe/4_hurt/H-41.png",
            "./assets/images/2_character_pepe/4_hurt/H-42.png",
            "./assets/images/2_character_pepe/4_hurt/H-43.png"
        ];
    }


    /**
     * Returns the frames of the dying animation.
     * @returns {string[]} paths of the seven dying frames
     */
    getDeadImages() {
        return [
            "./assets/images/2_character_pepe/5_dead/D-51.png",
            "./assets/images/2_character_pepe/5_dead/D-52.png",
            "./assets/images/2_character_pepe/5_dead/D-53.png",
            "./assets/images/2_character_pepe/5_dead/D-54.png",
            "./assets/images/2_character_pepe/5_dead/D-55.png",
            "./assets/images/2_character_pepe/5_dead/D-56.png",
            "./assets/images/2_character_pepe/5_dead/D-57.png"
        ];
    }


    /**
     * Connects Pepe to the game world and starts his movement.
     * @param {World} world - the game world
     */
    setWorld(world) {
        this.world = world;
        this.animate();
    }


    /**
     * Starts gravity, movement and frame changes.
     */
    animate() {
        this.applyGravity();
        setStoppableInterval(() => this.move(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 100);
    }


    /**
     * Moves Pepe according to the pressed keys and lets the camera follow.
     */
    move() {
        if (this.isDead()) {
            soundManager.pause("walk");
            return;
        }
        this.walk();
        this.checkJump();
        this.updateWalkSound();
        this.world.cameraX = -this.x + 100;
    }


    /**
     * Walks left or right as long as the end of the level has not been reached.
     */
    walk() {
        if (this.world.keyboard.right && this.x < this.world.level.endX) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.left && this.x > 100) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }


    /**
     * Jumps if the jump key is pressed and Pepe is standing on the ground.
     */
    checkJump() {
        if (this.world.keyboard.jump && !this.isAboveGround()) {
            this.jump();
            soundManager.play("jump");
        }
    }


    /**
     * Plays footsteps only while Pepe is walking on the ground.
     */
    updateWalkSound() {
        if (this.isWalking() && !this.isAboveGround()) {
            soundManager.playLoop("walk");
        } else {
            soundManager.pause("walk");
        }
    }


    /**
     * Checks whether an arrow key for walking is pressed.
     * @returns {boolean} true while Pepe wants to walk
     */
    isWalking() {
        return this.world.keyboard.right || this.world.keyboard.left;
    }


    /**
     * Updates idle time, animation and hurt phase.
     */
    updateAnimation() {
        if (!this.isIdle()) {
            this.wakeUp();
        }
        this.chooseAnimation();
        this.countDownHurt();
    }


    /**
     * Picks the matching animation for Pepe's current state.
     */
    chooseAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isAboveGround()) {
            this.playAnimationOnce(this.imagesJumping);
        } else if (this.isWalking()) {
            this.playAnimation(this.imagesWalking);
        } else {
            this.playIdleAnimation();
        }
    }


    /**
     * Checks whether Pepe is currently doing nothing.
     * @returns {boolean} true if Pepe is standing still
     */
    isIdle() {
        return !this.isDead() && !this.isHurt() && !this.isAboveGround() &&
            !this.isWalking() && !this.world.keyboard.throwBottle;
    }


    /**
     * Resets the idle time and stops the snoring.
     */
    wakeUp() {
        this.idleTicks = 0;
        soundManager.pause("snore");
    }


    /**
     * Plays the idle animation and after ten seconds the sleeping animation with snoring.
     */
    playIdleAnimation() {
        this.idleTicks++;
        if (this.idleTicks % 2 !== 0) {
            return;
        }
        if (this.idleTicks === 90) {
            soundManager.play("voiceSleep");
        }
        if (this.idleTicks > 100) {
            this.playAnimation(this.imagesLongIdle);
            soundManager.playLoop("snore");
        } else {
            this.playAnimation(this.imagesIdle);
        }
    }


    /**
     * Plays the dying animation once and keeps counting afterwards.
     */
    playDeadAnimation() {
        this.deadTicks++;
        this.playAnimationOnce(this.imagesDead);
    }


    /**
     * Checks whether the dying animation including a short pause is over.
     * @returns {boolean} true once the end screen may appear
     */
    isDeadAnimationDone() {
        return this.deadTicks > 15;
    }


    /**
     * Checks whether Pepe is falling onto an enemy from above.
     * @param {MovableObject} enemy - the enemy that was hit
     * @returns {boolean} true when landing on it from above
     */
    isStomping(enemy) {
        const feet = this.y + this.height - this.offset.bottom;
        return this.isAboveGround() && this.speedY < 0 && feet < enemy.y + enemy.height / 2;
    }


    /**
     * Lets Pepe bounce off briefly after hitting an enemy from above.
     */
    bounce() {
        this.speedY = 8;
    }
}
