class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    speed = 1;
    isAngry = false;
    firstContactEndboss = false;
    world;

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

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
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    win_sound = new Audio('assets/audio/audio_win.mp3');

    constructor() {
        super().loadImage(this.IMAGES_STANDING[0]);

        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3700;
        this.animate();
        
        
    }

    /**
     * Start endboss walking if character is near enough
     * 
     * 
     */
    startEndboss(){
        setInterval(() => {
            if (this.firstContactEndboss) {
                this.moveToLeft();
            }
        }, 20);
    }

    /**
     * Move the endboss to the left
     * 
     * 
     */
    moveToLeft(){
            this.moveLeft();
    }

    /**
     * Animates the endboss if walking, angry or dead
     * 
     * 
     */
    animate() {
        this.startEndboss();

        let IDOfInterval = setInterval(() => {
            if (this.energy == 100) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (this.energy < 100 && this.energy > 0) {
                this.playAnimation(this.IMAGES_ANGRY);
                this.speed = 2;
            }
            else if (this.energy <= 0) {
                this.endbossIsDead();
            }
        }, 150);
    }

    /**
     * Play animation for dead endboss
     * 
     * 
     */
    endbossIsDead(){
        this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                this.playWinSound();
                setTimeout(() => {
                    this.world.gameOver = true;
                    clearInterval(this.IDOfInterval);
                }, 2000); 
    }

    /**
     * Play sound for dead endboss
     * 
     * 
     */
    playWinSound(){
        if (this.world.soundOn) {
            this.win_sound.play();
        }
    }
}