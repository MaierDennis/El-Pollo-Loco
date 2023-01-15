class ThrowableObject extends MovableObject {

    bottleHittedEndboss = false;

    IMAGES_BOTTLE = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'

    ];

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        
        setInterval(() => {
          this.x += 10;  
        }, 30);
    }

    animate(){
        setInterval(() => {
            if(this.bottleHittedEndboss){
               //clearInterval(IDOfInterval);
               console.log('Animation fertig'); 
            }

            else if (!this.bottleHittedEndboss){
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 60);
        
    }
}