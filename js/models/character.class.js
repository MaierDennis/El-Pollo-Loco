class Character extends MovableObject {
    y = 155;
    height = 280;
    speed = 10;
    world;

    offset = {
        top: 130,
        bottom: 15,
        left: 40,
        right: 40
    }

    IMAGES_STAND = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    
    walking_sound = new Audio('assets/audio/audio_footsteps.mp3');
    collect_sound = new Audio('assets/audio/audio_collect.mp3');
    hurt_sound = new Audio('assets/audio/audio_hurt.mp3');
    jump_sound = new Audio('assets/audio/audio_jump.mp3');
    win_sound = new Audio('assets/audio/audio_win.mp3');
    lost_sound = new Audio('assets/audio/audio_lost.mp3');
    


    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STAND);
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.jump_sound.pause();
            this.jump_sound.currentTime = 0;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.playWalkingSound();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.playWalkingSound();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.playJumpSound();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.playJumpSound();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        let interval = setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.playLostSound();
                setTimeout(() => {
                    clearInterval(interval);
                }, 300);
                this.world.gameOver = true;
            }

            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.playHurtSound();
            }

            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
                else {
                    this.playAnimation(this.IMAGES_STAND);
                }
            }
        }, 100);

    }

    playWalkingSound(){
        if (this.world.soundOn) {
            this.walking_sound.play();
        }
    }

    playHurtSound(){
        if (this.world.soundOn) {
            this.hurt_sound.play();
        }
    }

    playJumpSound(){
        if (this.world.soundOn) {
            this.jump_sound.play();
        }
    }

    playCollectSound(){
        if (this.world.soundOn) {
            this.collect_sound.play();
        }
    }

    playWinSound(){
        if (this.world.soundOn) {
            this.win_sound.play();
        }
    }

    playLostSound(){
        if (this.world.soundOn) {
            this.lost_sound.play();
        }
    }

    
}






