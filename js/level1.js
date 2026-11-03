/**
 * Builds level 1 with all enemies, coins and bottles.
 * @returns {Level} the finished level
 */
function createLevel1() {
    return new Level(createLevel1Enemies(), new Endboss(4700), createLevel1Coins(), createLevel1Bottles(), 6);
}


/**
 * Creates the chickens and chicks of level 1 with different speeds.
 * @returns {Chicken[]} the enemies
 */
function createLevel1Enemies() {
    return [
        new Chicken(900, 0.3),
        new SmallChicken(1300, 0.6),
        new Chicken(1600, 0.4),
        new Chicken(2000, 0.25),
        new SmallChicken(2300, 0.7),
        new Chicken(2700, 0.35),
        new SmallChicken(3000, 0.8),
        new Chicken(3400, 0.45),
        new SmallChicken(3700, 0.6)
    ];
}


/**
 * Creates the coins of level 1, three in an arc each.
 * @returns {Coin[]} the coins
 */
function createLevel1Coins() {
    return [
        new Coin(600, 260),
        new Coin(680, 190),
        new Coin(760, 260),
        new Coin(1500, 230),
        new Coin(1580, 160),
        new Coin(1660, 230),
        new Coin(2500, 250),
        new Coin(2580, 180),
        new Coin(3300, 230),
        new Coin(3380, 160)
    ];
}


/**
 * Creates the bottles of level 1, placed closer together towards the final boss.
 * @returns {Bottle[]} the bottles
 */
function createLevel1Bottles() {
    return [
        new Bottle(450, 1),
        new Bottle(1100, 2),
        new Bottle(1450, 1),
        new Bottle(1900, 2),
        new Bottle(2400, 1),
        new Bottle(2850, 2),
        new Bottle(3250, 1),
        new Bottle(3600, 2),
        new Bottle(3900, 1),
        new Bottle(4150, 2)
    ];
}
