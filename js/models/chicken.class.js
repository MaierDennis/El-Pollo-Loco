class Chicken extends MovableObject {


    height = 60;
    width = 80;
    y = 370;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEATH = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    isDead = false;

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEATH);

        this.x = 400 + Math.random() * 3500; //Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animateChickenDeadOrWalking();
    }

    animateChickenDeadOrWalking(){

        setInterval(() => {
        if (this.isDead) {
            this.playAnimation(this.IMAGE_DEATH);
          }
          // Chicken WALKING
          else {
            this.playAnimation(this.IMAGES_WALKING);
          }
        }, 125)
    }
}