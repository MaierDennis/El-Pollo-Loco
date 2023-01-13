class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = this.x = Math.random() * 500; //Zahl zwischen 200 und 700
        this.animateClouds();
    }

    animateClouds() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

   

}