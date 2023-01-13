class World {
    character = new Character();
    level = level1;
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

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectCoin();
            this.checkCollectBottle();
        }, 200);
    }

    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
             this.character.hit();
             this.statusBar.setPercentage(this.character.energy);
             console.log('Collision with character, energy ', this.character.energy)
            }
         });
    }

    checkCollectCoin(){
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, index)) {
                console.log('Treffer Coin', index); 
                this.removeCoinFromMap(index);
                this.collectedCoins++;
            }
        });
    }

    
    checkCollectBottle(){
        this.level.salsabottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, index)) {
                console.log('Treffer Salsa', index); 
                this.removeBottleFromMap(index);
                this.collectedBottles++;
            }
        });
    }

    removeCoinFromMap(i){
        this.level.coins.splice(i, 1);
    }

    removeBottleFromMap(i){
        this.level.salsabottles.splice(i, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.smallCoin);
        this.addToMap(this.smallBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottles);
        
        this.drawAmountOfCollectedObjects();
        
        this.ctx.translate(-this.camera_x, 0);

        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawAmountOfCollectedObjects(){
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

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}