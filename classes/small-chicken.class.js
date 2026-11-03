class SmallChicken extends Chicken {
    /**
     * Creates a chick that is smaller than a regular chicken.
     * @param {number} x - start position on the x-axis
     * @param {number} speed - walking speed
     */
    constructor(x, speed) {
        super(x, speed);
        this.y = 382;
        this.width = 50;
        this.height = 45;
        this.offset = { top: 4, right: 7, bottom: 4, left: 7 };
    }


    /**
     * Returns the frames of the chick's walking animation.
     * @returns {string[]} paths of the three walking frames
     */
    getWalkingImages() {
        return [
            "./assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png",
            "./assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png",
            "./assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png"
        ];
    }


    /**
     * Returns the image of the defeated chick.
     * @returns {string} path to the image
     */
    getDeadImage() {
        return "./assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png";
    }
}
