class SalsaBottle extends DrawableObject {


    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 3500; //Zahl zwischen 200 und 1200
        this.y = 350;
        this.width = 80; 
        this.height = 80;
    }
}