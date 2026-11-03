class StatusBar extends DrawableObject {
    /**
     * Creates a status bar at a fixed position on the screen.
     * @param {string} type - folder name of the bar: health, coin, bottle or endboss
     * @param {number} x - position on the x-axis
     * @param {number} y - position on the y-axis
     * @param {number} percentage - start value in percent
     */
    constructor(type, x, y, percentage) {
        super();
        this.images = this.getImages(type);
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 53;
        this.setPercentage(percentage);
    }


    /**
     * Builds the paths of the six fill levels of a bar.
     * @param {string} type - folder name of the bar
     * @returns {string[]} paths from 0 to 100 percent
     */
    getImages(type) {
        return [0, 20, 40, 60, 80, 100].map((step) => `./assets/images/7_statusbars/${type}/${step}.png`);
    }


    /**
     * Sets the fill level and picks the matching image.
     * @param {number} percentage - new value in percent
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.images[this.resolveImageIndex()]];
    }


    /**
     * Maps the percentage to one of the six images.
     * @returns {number} index of the image from 0 to 5
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        }
        return 0;
    }
}
