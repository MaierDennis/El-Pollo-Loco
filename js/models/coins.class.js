class Coin extends DrawableObject {

    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1000; //Zahl zwischen 200 und 1200
        this.y = 80 + Math.random() * 80;
        this.width = 150; 
        this.height = 150;
    }

    
}