class World {
    character = new Character();
    level = level1;
    endboss = this.level.endboss[0];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    throwableObjects = [
        new ThrowableObject()
    ];
    collectedCoins = 0;
    collectedBottles = 0;
    smallCoin = new SmallCoin();
    smallBottle = new SmallBottle();
    hitOneTime = false;
    gameOver = false;
    soundOn = false;

    collect_sound = new Audio('assets/audio/audio_collect.mp3');
    dead_chicken = new Audio('assets/audio/audio_chicken.mp3');
    splashed_bottle = new Audio('assets/audio/audio_glass.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.gameIsOver();
        this.checkSOundOn();
    }

    /**
     * Set the world to character and endboss
     * 
     * 
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Check if sound is enabled
     * 
     * 
     */
    checkSOundOn() {
        if (soundIsOn) {
            this.soundOn = true;
        }
    }

    /**
     * Play the game-over animation
     * 
     * 
     */
    gameIsOver() {
        setInterval(() => {

            if (this.gameOver) {
                //console.log('GameOver')
                document.getElementById('endScreen').style.display = "flex";
            }
        }, 200);
    }

    /**
     * Running all functions with the correct interval
     * 
     * 
     */
    run() {

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);

        setInterval(() => {
            this.checkCollectCoin();
            this.checkCollectBottle();
            this.checkChickenDead();
            this.checkBottleHitEndboss();
            this.checkPositionForEndboss();
            
        }, 20);
    }

    /**
     * Check if there are bottles in the inventar
     * 
     * 
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 && this.character.otherDirection == false) {
            this.throwThisBottle();
        }
    }

    /**
     * Add new bottle and throw it
     * 
     * 
     */
    throwThisBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.collectedBottles -= 1;
    }

    /**
     * Check the collision between objects
     * 
     * 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY >= 0 && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Collision with character, energy ', this.character.energy);
            }
        });

        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && this.endboss.energy > 0) {
                this.character.hit();
                endboss.isAngry = true;
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Collision with character, energy ', this.character.energy);
            }
        });
    }

    /**
     * Check if character is colliding with coin and collect it
     * 
     * 
     */
    checkCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, index)) {
                //console.log('Treffer Coin', index);
                this.removeCoinFromMap(index);
                this.playCollectSound();
                this.collectedCoins++;
            }
        });
    }

    /**
     * Check if character is colliding with bottle and collect it
     * 
     * 
     */
    checkCollectBottle() {
        this.level.salsabottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, index)) {
                //console.log('Treffer Salsa', index);
                this.removeBottleFromMap(index);
                this.playCollectSound();
                this.collectedBottles++;
            }
        });
    }


    /**
     * Play sound for collecting item
     * 
     * 
     */
    playCollectSound() {
        if (this.soundOn) {
            this.collect_sound.play();
        }
    }

    /**
     * Check if bottle hitted endboss
     * 
     * 
     */
    checkBottleHitEndboss() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle) && this.hitOneTime == false) {
                this.bottleHitEndboss(index);
            }
        });
    }

    /**
     * Actions when bottle hits endboss
     * 
     * @param {number} index - The index of the bottle
     */
    bottleHitEndboss(index) {
        this.hitOneTime = true;
        this.endboss.energy -= 10;
        this.throwableObjects[index].bottleHittedEndboss = true;
        this.playSplashBottle();
        setTimeout(() => {
            this.throwableObjects.splice(index, 1);
        }, 200);
        setTimeout(() => {
            this.hitOneTime = false;
        }, 200);
    }


    /**
     * Play sound of splashed bottle
     * 
     * 
     */
    playSplashBottle() {
        if (this.soundOn) {
            this.splashed_bottle.play();
        }
    }

    /**
     * Check if chicken is dead by jumping on it
     * 
     * 
     */
    checkChickenDead() {
        this.level.enemies.forEach((enemy) => {

            if (!enemy.isDead && this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.kill();
                this.playChickenDead();
                this.removeDeadChicken(enemy);
                this.character.jump();
                //console.log('Chicken Dead')
            }
        });
    }

    /**
     * Play sound for dead chicken
     * 
     * 
     */
    playChickenDead() {
        if (this.soundOn) {
            this.dead_chicken.play();
        }
    }

    /**
     * Remove dead chicken from map
     * 
     * @param {object} enemy - Enemy which has been killed
     */
    removeDeadChicken(enemy) {
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
        }, 1000);
    }


    /**
     * Remove Coin from map
     * 
     * @param {number} i - Index of the coin
     */
    removeCoinFromMap(i) {
        this.level.coins.splice(i, 1);
    }

    /**
     * Remove bottle from map
     * 
     * @param {number} i - Index of the bottle     */
    removeBottleFromMap(i) {
        this.level.salsabottles.splice(i, 1);
    }

    /**
     * Check the position of the character for starting endboss
     * 
     * 
     */
    checkPositionForEndboss() {
        setInterval(() => {
            if (this.character.x > 3000) {
                this.level.endboss[0].firstContactEndboss = true;
            }
        }, 200);
    }

    /**
     * Draw all objects to canvas
     * 
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects)

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottles);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.smallCoin);
        this.addToMap(this.smallBottle);
        this.ctx.translate(this.camera_x, 0);

        this.drawAmountOfCollectedObjects();

        this.ctx.translate(-this.camera_x, 0);

        //draw restart itself
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draw the number of collected objects
     * 
     * 
     */
    drawAmountOfCollectedObjects() {
        this.ctx.font = '35px Zabras';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(('= ' + this.collectedCoins), 10 + this.character.x, 92); //number of Coins
        this.ctx.fillText(('= ' + this.collectedBottles), 100 + this.character.x, 92); //number of Bottles
    }

    /**
     * Add every object to the map
     * 
     * @param {object} objects - The object which will be added
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Add the single object to map and check if it should be flipped
     * 
     * @param {object} mo - The object which will be added
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);

        }
    }

    /**
     * Flip the pictures to the other way
     * 
     * @param {object} mo - The object which will be added
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flip the pictures back
     * 
     * @param {object} mo - The object which will be added
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}