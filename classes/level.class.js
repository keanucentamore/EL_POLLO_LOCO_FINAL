class Level {
    /**
     * Groups all objects of a level and builds the background.
     * @param {Chicken[]} enemies - the regular enemies
     * @param {Endboss} endboss - the final boss
     * @param {Coin[]} coins - the coins
     * @param {Bottle[]} bottles - the bottles on the ground
     * @param {number} tileCount - number of background tiles
     */
    constructor(enemies, endboss, coins, bottles, tileCount) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
        this.coinCount = coins.length;
        this.tileCount = tileCount;
        this.endX = tileCount * 853 - 620;
        this.sky = this.createSky();
        this.clouds = this.createClouds();
        this.landscape = this.createLandscape();
    }


    /**
     * Creates the sky as tiles side by side.
     * @returns {BackgroundObject[]} the sky tiles
     */
    createSky() {
        const sky = [];
        for (let i = 0; i < this.tileCount; i++) {
            sky.push(new BackgroundObject("./assets/images/5_background/layers/air.png", i * 853));
        }
        return sky;
    }


    /**
     * Creates two more clouds than tiles, alternating image 1 and 2.
     * @returns {Cloud[]} the clouds
     */
    createClouds() {
        const clouds = [];
        const cloudCount = this.tileCount + 2;
        for (let i = 0; i < cloudCount; i++) {
            clouds.push(new Cloud((i % 2) + 1, i * 853, cloudCount * 853));
        }
        return clouds;
    }


    /**
     * Creates the three landscape layers, from back to front.
     * @returns {BackgroundObject[]} the landscape tiles
     */
    createLandscape() {
        const landscape = [];
        for (let i = 0; i < this.tileCount; i++) {
            const number = (i % 2) + 1;
            landscape.push(this.createTile("3_third_layer", number, i));
            landscape.push(this.createTile("2_second_layer", number, i));
            landscape.push(this.createTile("1_first_layer", number, i));
        }
        return landscape;
    }


    /**
     * Creates a single landscape tile.
     * @param {string} layer - folder name of the layer
     * @param {number} number - image number, 1 or 2
     * @param {number} index - position of the tile in the row
     * @returns {BackgroundObject} the tile
     */
    createTile(layer, number, index) {
        const path = `./assets/images/5_background/layers/${layer}/${number}.png`;
        return new BackgroundObject(path, index * 853);
    }
}
