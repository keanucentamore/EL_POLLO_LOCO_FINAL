class Chicken extends MovableObject {
    /**
     * Loads the chicken's images and places it at its start position.
     * @param {number} x - start position on the x-axis
     * @param {number} speed - walking speed
     */
    constructor(x, speed) {
        super();
        this.imagesWalking = this.getWalkingImages();
        this.imageDead = this.getDeadImage();
        this.loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages([this.imageDead]);
        this.x = x;
        this.y = 360;
        this.width = 70;
        this.height = 70;
        this.speed = speed;
        this.offset = { top: 5, right: 5, bottom: 7, left: 5 };
        this.animate();
    }


    /**
     * Returns the frames of the walking animation.
     * @returns {string[]} paths of the three walking frames
     */
    getWalkingImages() {
        return [
            "./assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
            "./assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
            "./assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
        ];
    }


    /**
     * Returns the image of the defeated chicken.
     * @returns {string} path to the image
     */
    getDeadImage() {
        return "./assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    }


    /**
     * Starts walking and frame changes.
     */
    animate() {
        setStoppableInterval(() => this.walk(), 1000 / 60);
        setStoppableInterval(() => this.updateAnimation(), 150);
    }


    /**
     * Lets the chicken walk to the left while it is alive.
     */
    walk() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }


    /**
     * Shows the walking animation or briefly the image of the defeated chicken.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.img = this.imageCache[this.imageDead];
            this.deadTicks++;
            this.isRemovable = this.deadTicks > 6;
        } else {
            this.playAnimation(this.imagesWalking);
        }
    }


    /**
     * Defeats the chicken immediately.
     */
    die() {
        this.energy = 0;
        soundManager.play("chickenDead");
    }
}
