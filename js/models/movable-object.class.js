class MovableObject extends DrawableObject {
    speed = 0.15;
    y = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; //Wert für Beschleunigung
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 155;
        }
    }


    isColliding(object) {
        return this.rightBorder() > this.leftObjectBorder(object) &&
            this.bottomBorder() > this.topObjectBorder(object) &&
            this.leftBorder() < this.rightObjectBorder(object) &&
            this.topBorder() < this.bottomObjectBorder(object);
    }
    rightBorder() {
        return this.x + this.width - this.offset.right;
    }
    leftBorder() {
        return this.x + this.offset.left;
    }
    topBorder() {
        return this.y + this.offset.top;
    }
    bottomBorder() {
        return this.y + this.height - this.offset.bottom;
    }
    rightObjectBorder(object) {
        return object.x + object.width - object.offset.right;
    }
    leftObjectBorder(object) {
        return object.x + object.offset.left;
    }
    topObjectBorder(object) {
        return object.y + object.offset.top;
    }
    bottomObjectBorder(object) {
        return object.y + object.height - object.offset.bottom;
    }


    hit() {
        this.energy -= 5;

        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}