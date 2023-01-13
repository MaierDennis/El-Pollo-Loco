class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    isAngry = false;

    IMAGES_STANDING = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ANGRY = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    constructor(){
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_ANGRY);

        this.x = 3700;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isAngry == false) {
                    this.playAnimation(this.IMAGES_STANDING);
            }
            else if (this.isAngry == true){
                    this.playAnimation(this.IMAGES_ANGRY);
            } 
        }, 250);
        
            
        

        /*else if (isAngry) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_ANGRY);
            }, 250);
        }*/
        
    }
}