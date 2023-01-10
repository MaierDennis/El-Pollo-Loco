class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2100;
    coins;
    salsabottles;
    

    constructor(enemies, clouds, backgroundObjects, coins, salsabottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsabottles = salsabottles;
    }
} 