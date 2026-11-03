class ThrowableObject extends MovableObject {
    /**
     * Creates a thrown bottle and lets it fly.
     * @param {number} x - start position on the x-axis
     * @param {number} y - start position on the y-axis
     * @param {boolean} isThrownLeft - true if Pepe is facing left
     */
    constructor(x, y, isThrownLeft) {
        super();
        this.loadAllImages();
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.groundY = 360;
        this.offset = { top: 12, right: 25, bottom: 10, left: 25 };
        this.direction = isThrownLeft ? -1 : 1;
        this.isSplashing = false;
        this.speed = 7;
        this.speedY = 8;
        this.throw();
    }


    /**
     * Loads the frames for spinning and bursting into the image cache.
     */
    loadAllImages() {
        this.imagesRotation = this.getRotationImages();
        this.imagesSplash = this.getSplashImages();
        this.loadImage(this.imagesRotation[0]);
        this.loadImages(this.imagesRotation);
        this.loadImages(this.imagesSplash);
    }


    /**
     * Returns the frames of the spinning bottle.
     * @returns {string[]} paths of the four rotation frames
     */
    getRotationImages() {
        return [
            "./assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
        ];
    }


    /**
     * Returns the frames of the bursting bottle.
     * @returns {string[]} paths of the six splash frames
     */
    getSplashImages() {
        return [
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
            "./assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
        ];
    }


    /**
     * Starts gravity, flight and frame changes.
     */
    throw() {
        this.applyGravity();
        setStoppableInterval(() => this.fly(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 80);
    }


    /**
     * Moves the bottle horizontally and lets it burst on the ground.
     */
    fly() {
        if (this.isSplashing) {
            return;
        }
        this.x = this.x + this.speed * this.direction;
        if (!this.isAboveGround()) {
            this.splash();
        }
    }


    /**
     * Stops the bottle where it hit and lets it burst.
     */
    splash() {
        this.isSplashing = true;
        this.speedY = 0;
        this.acceleration = 0;
        soundManager.play("bottleBreak");
    }


    /**
     * Shows the spinning in flight or the bursting once.
     */
    updateAnimation() {
        if (!this.isSplashing) {
            this.playAnimation(this.imagesRotation);
            return;
        }
        this.playAnimationOnce(this.imagesSplash);
        if (this.isAnimationFinished(this.imagesSplash)) {
            this.isRemovable = true;
        }
    }
}
