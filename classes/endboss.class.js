class Endboss extends MovableObject {
    /**
     * Loads the images of Señora Gallina and places her at the end of the level.
     * @param {number} x - start position on the x-axis
     */
    constructor(x) {
        super();
        this.loadAllImages();
        this.x = x;
        this.y = 36;
        this.width = 343;
        this.height = 400;
        this.speed = 1.5;
        this.offset = { top: 90, right: 25, bottom: 20, left: 25 };
        this.hadFirstContact = false;
    }


    /**
     * Loads the frames of all animations into the image cache.
     */
    loadAllImages() {
        this.imagesWalking = this.getWalkingImages();
        this.imagesAlert = this.getAlertImages();
        this.imagesAttack = this.getAttackImages();
        this.imagesHurt = this.getHurtImages();
        this.imagesDead = this.getDeadImages();
        this.loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
    }


    /**
     * Returns the frames of the walking animation.
     * @returns {string[]} paths of the four walking frames
     */
    getWalkingImages() {
        return [
            "./assets/images/4_enemy_boss_chicken/1_walk/G1.png",
            "./assets/images/4_enemy_boss_chicken/1_walk/G2.png",
            "./assets/images/4_enemy_boss_chicken/1_walk/G3.png",
            "./assets/images/4_enemy_boss_chicken/1_walk/G4.png"
        ];
    }


    /**
     * Returns the frames of the alert animation.
     * @returns {string[]} paths of the eight alert frames
     */
    getAlertImages() {
        return [
            "./assets/images/4_enemy_boss_chicken/2_alert/G5.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G6.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G7.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G8.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G9.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G10.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G11.png",
            "./assets/images/4_enemy_boss_chicken/2_alert/G12.png"
        ];
    }


    /**
     * Returns the frames of the attack animation.
     * @returns {string[]} paths of the eight attack frames
     */
    getAttackImages() {
        return [
            "./assets/images/4_enemy_boss_chicken/3_attack/G13.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G14.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G15.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G16.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G17.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G18.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G19.png",
            "./assets/images/4_enemy_boss_chicken/3_attack/G20.png"
        ];
    }


    /**
     * Returns the frames of the hurt animation.
     * @returns {string[]} paths of the three hurt frames
     */
    getHurtImages() {
        return [
            "./assets/images/4_enemy_boss_chicken/4_hurt/G21.png",
            "./assets/images/4_enemy_boss_chicken/4_hurt/G22.png",
            "./assets/images/4_enemy_boss_chicken/4_hurt/G23.png"
        ];
    }


    /**
     * Returns the frames of the dying animation.
     * @returns {string[]} paths of the three dying frames
     */
    getDeadImages() {
        return [
            "./assets/images/4_enemy_boss_chicken/5_dead/G24.png",
            "./assets/images/4_enemy_boss_chicken/5_dead/G25.png",
            "./assets/images/4_enemy_boss_chicken/5_dead/G26.png"
        ];
    }


    /**
     * Connects the final boss to the game world and starts its movement.
     * @param {World} world - the game world
     */
    setWorld(world) {
        this.world = world;
        this.animate();
    }


    /**
     * Starts movement and frame changes.
     */
    animate() {
        setStoppableInterval(() => this.move(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 150);
    }


    /**
     * Walks towards Pepe after the first contact, faster when attacking.
     */
    move() {
        if (this.isDead() || this.isHurt() || !this.hadFirstContact) {
            return;
        }
        this.speed = this.isAttacking() ? 4 : 1.5;
        const distance = this.getDistanceToCharacter();
        if (distance > 10) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (distance < -10) {
            this.moveRight();
            this.otherDirection = true;
        }
    }


    /**
     * Measures the distance between the center of the final boss and the center of Pepe.
     * @returns {number} positive if Pepe is left of the final boss
     */
    getDistanceToCharacter() {
        const character = this.world.character;
        return this.x + this.width / 2 - (character.x + character.width / 2);
    }


    /**
     * Checks whether Pepe is close enough for an attack.
     * @returns {boolean} true within attack range
     */
    isAttacking() {
        const distance = this.getDistanceToCharacter();
        return distance < 250 && distance > -250;
    }


    /**
     * Picks the matching animation and counts down the hurt phase.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.deadTicks++;
            this.playAnimationOnce(this.imagesDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (!this.hadFirstContact) {
            this.checkFirstContact();
            this.playAnimation(this.imagesAlert);
        } else {
            this.playAnimation(this.isAttacking() ? this.imagesAttack : this.imagesWalking);
        }
        this.countDownHurt();
    }


    /**
     * Starts the fight as soon as Pepe comes into view.
     */
    checkFirstContact() {
        if (this.x - this.world.character.x < 600) {
            this.hadFirstContact = true;
            soundManager.play("bossAlert");
            soundManager.playVoice("voiceBoss");
        }
    }


    /**
     * Checks whether the dying animation including a short pause is over.
     * @returns {boolean} true once the end screen may appear
     */
    isDeadAnimationDone() {
        return this.deadTicks > 12;
    }
}
