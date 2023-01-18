class ThrowableObject extends MovableObject {

    bottleHittedEndboss = false;

    IMAGES_BOTTLE = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLESPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLESPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw(){
        this.speedY = 20;
        this.applyGravity();
        
        setInterval(() => {
          this.x += 10;  
        }, 30);
    }

    animate(){
        let IDOfBottleInterval = setInterval(() => {
            if(this.bottleHittedEndboss){
               //console.log('Animation fertig'); 
               this.playAnimation(this.IMAGES_BOTTLESPLASH);
                clearInterval(IDOfBottleInterval);
            }

            else if (!this.bottleHittedEndboss){
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 60);
        
    }
}