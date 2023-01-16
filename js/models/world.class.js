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
    




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

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
        }, 20);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 && this.character.otherDirection == false) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY >= 0 && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with character, energy ', this.character.energy);
            }
        });

        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                endboss.isAngry = true;
                console.log(endboss.isAngry);
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision with character, energy ', this.character.energy);
            }
        });
    }

    checkCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, index)) {
                console.log('Treffer Coin', index);
                this.removeCoinFromMap(index);
                this.collectedCoins++;
            }
        });
    }

    checkCollectBottle() {
        this.level.salsabottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, index)) {
                console.log('Treffer Salsa', index);
                this.removeBottleFromMap(index);
                this.collectedBottles++;
            }
        });
    }

    checkBottleHitEndboss() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle) && this.hitOneTime  == false) {
                this.hitOneTime = true;
                this.endboss.energy -= 10;
                this.throwableObjects[index].bottleHittedEndboss = true;
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 200);
                console.log('Bottle hitted endboss ' + this.throwableObjects[index].bottleHittedEndboss);
                setTimeout(() => {
                    this.hitOneTime = false;
                }, 200);
            }
        });
    }

    checkChickenDead() {
        this.level.enemies.forEach((enemy) => {

            if (!enemy.isDead && this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.kill();
                this.removeDeadChicken(enemy);
                this.character.jump();
                console.log('Chicken Dead')
            }
        });
    }

    removeDeadChicken(enemy) {
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
        }, 1000);
    }

    removeCoinFromMap(i) {
        this.level.coins.splice(i, 1);
    }

    removeBottleFromMap(i) {
        this.level.salsabottles.splice(i, 1);
    }

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

        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawAmountOfCollectedObjects() {
        this.ctx.font = '30px Serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(('= ' + this.collectedCoins), 10 + this.character.x, 92); //number of Coins
        this.ctx.fillText(('= ' + this.collectedBottles), 100 + this.character.x, 92); //number of Bottles
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}