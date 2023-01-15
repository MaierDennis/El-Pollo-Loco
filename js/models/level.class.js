class Level {
    enemies;
    //endboss;
    clouds;
    backgroundObjects;
    level_end_x = 4000;
    coins;
    salsabottles;
    

    constructor(enemies, endboss, clouds, backgroundObjects, coins, salsabottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsabottles = salsabottles;
    }
} 