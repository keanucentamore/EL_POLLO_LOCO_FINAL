class Coin extends DrawableObject {
    /**
     * Places a pulsing coin at its position.
     * @param {number} x - position on the x-axis
     * @param {number} y - position on the y-axis
     */
    constructor(x, y) {
        super();
        this.images = this.getImages();
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
        this.offset = { top: 42, right: 42, bottom: 42, left: 42 };
        this.isCollected = false;
        setStoppableInterval(() => this.playAnimation(this.images), 300);
    }


    /**
     * Returns the two images of the coin.
     * @returns {string[]} paths of the coin images
     */
    getImages() {
        return [
            "./assets/images/8_coin/coin_1.png",
            "./assets/images/8_coin/coin_2.png"
        ];
    }
}
