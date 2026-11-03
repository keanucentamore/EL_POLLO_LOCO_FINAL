class Bottle extends DrawableObject {
    /**
     * Places a salsa bottle on the ground to be collected.
     * @param {number} x - position on the x-axis
     * @param {number} number - image variant, 1 or 2
     */
    constructor(x, number) {
        super();
        this.loadImage(`./assets/images/6_salsa_bottle/${number}_salsa_bottle_on_ground.png`);
        this.x = x;
        this.y = 360;
        this.width = 70;
        this.height = 70;
        this.offset = { top: 15, right: 15, bottom: 8, left: 25 };
        this.isCollected = false;
    }
}
