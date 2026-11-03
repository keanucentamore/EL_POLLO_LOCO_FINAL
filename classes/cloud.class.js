class Cloud extends MovableObject {
    /**
     * Loads a cloud image and places it at its position.
     * @param {number} number - image number, 1 or 2
     * @param {number} x - start position on the x-axis
     * @param {number} wrapWidth - total width of all clouds
     */
    constructor(number, x, wrapWidth) {
        super();
        this.loadImage(`./assets/images/5_background/layers/4_clouds/${number}.png`);
        this.x = x;
        this.y = 0;
        this.width = 853;
        this.height = 480;
        this.speed = 0.15;
        this.wrapWidth = wrapWidth;
        this.animate();
    }


    /**
     * Lets the cloud drift slowly to the left all the time.
     */
    animate() {
        setStoppableInterval(() => this.drift(), 1000 / 60);
    }


    /**
     * Moves the cloud to the left and places it at the back once it has left the screen.
     */
    drift() {
        this.moveLeft();
        if (this.x < -853) {
            this.x = this.x + this.wrapWidth;
        }
    }
}
