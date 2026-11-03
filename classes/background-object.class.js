class BackgroundObject extends DrawableObject {
    /**
     * Loads a background tile and places it at its position.
     * @param {string} path - path to the layer image
     * @param {number} x - position of the tile on the x-axis
     */
    constructor(path, x) {
        super();
        this.loadImage(path);
        this.x = x;
        this.y = 0;
        this.width = 853;
        this.height = 480;
    }
}
