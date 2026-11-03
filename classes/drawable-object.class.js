class DrawableObject {
    /**
     * Sets start values for position, size, images and hitbox.
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.img = new Image();
        this.imageCache = {};
        this.currentImage = 0;
        this.currentAnimation = null;
        this.offset = { top: 0, right: 0, bottom: 0, left: 0 };
    }


    /**
     * Loads a single image for this object.
     * @param {string} path - path to the image file
     */
    loadImage(path) {
        this.img.src = path;
    }


    /**
     * Preloads all frames of an animation into the image cache.
     * @param {string[]} paths - paths of the single frames
     */
    loadImages(paths) {
        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the object at its current position.
     * @param {CanvasRenderingContext2D} ctx - 2D context of the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Shows the next frame of an animation and starts over afterwards.
     * @param {string[]} images - paths of the single frames
     */
    playAnimation(images) {
        this.startAnimation(images);
        const index = this.currentImage % images.length;
        this.img = this.imageCache[images[index]];
        this.currentImage++;
    }


    /**
     * Shows the next frame of an animation and stays on the last frame at the end.
     * @param {string[]} images - paths of the single frames
     */
    playAnimationOnce(images) {
        this.startAnimation(images);
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        }
    }


    /**
     * Resets the frame counter as soon as a different animation starts.
     * @param {string[]} images - paths of the single frames
     */
    startAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
    }


    /**
     * Checks whether a one-time animation has reached its last frame.
     * @param {string[]} images - paths of the single frames
     * @returns {boolean} true once all frames have been shown
     */
    isAnimationFinished(images) {
        return this.currentAnimation === images && this.currentImage >= images.length;
    }
}
