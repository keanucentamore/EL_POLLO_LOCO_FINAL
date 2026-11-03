class MovableObject extends DrawableObject {
    /**
     * Sets speed, gravity, energy and states.
     */
    constructor() {
        super();
        this.speed = 0.2;
        this.otherDirection = false;
        this.speedY = 0;
        this.acceleration = 0.5;
        this.groundY = 0;
        this.energy = 100;
        this.hurtTicks = 0;
        this.deadTicks = 0;
        this.isRemovable = false;
    }


    /**
     * Starts gravity with 60 steps per second.
     */
    applyGravity() {
        setStoppableInterval(() => this.updateFall(), 1000 / 60);
    }


    /**
     * Moves the object by its vertical speed and slows it down.
     */
    updateFall() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y = this.y - this.speedY;
            this.speedY = this.speedY - this.acceleration;
        }
        if (this.y > this.groundY) {
            this.y = this.groundY;
            this.speedY = 0;
        }
    }


    /**
     * Checks whether the object is currently above the ground.
     * @returns {boolean} true while the object is in the air
     */
    isAboveGround() {
        return this.y < this.groundY;
    }


    /**
     * Lets the object jump up with a fixed start speed.
     */
    jump() {
        this.speedY = 13;
    }


    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x = this.x + this.speed;
    }


    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x = this.x - this.speed;
    }


    /**
     * Checks whether the hitboxes of two objects overlap.
     * @param {DrawableObject} other - the other object
     * @returns {boolean} true if they overlap
     */
    isColliding(other) {
        return this.x + this.width - this.offset.right > other.x + other.offset.left &&
            this.y + this.height - this.offset.bottom > other.y + other.offset.top &&
            this.x + this.offset.left < other.x + other.width - other.offset.right &&
            this.y + this.offset.top < other.y + other.height - other.offset.bottom;
    }


    /**
     * Subtracts energy and starts the short hurt phase.
     * @param {number} damage - energy to subtract
     */
    hit(damage) {
        this.energy = this.energy - damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.hurtTicks = 10;
    }


    /**
     * Checks whether the object is currently hurt.
     * @returns {boolean} true during the hurt phase
     */
    isHurt() {
        return this.hurtTicks > 0;
    }


    /**
     * Counts down the hurt phase by one animation step.
     */
    countDownHurt() {
        if (this.hurtTicks > 0) {
            this.hurtTicks--;
        }
    }


    /**
     * Checks whether the energy is used up.
     * @returns {boolean} true if the object is dead
     */
    isDead() {
        return this.energy === 0;
    }
}
