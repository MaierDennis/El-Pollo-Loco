class MovableObject extends DrawableObject {
    speed = 0.15;
    y = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; //Wert für Beschleunigung
    energy = 100;
    lastHit = 0;
    
    
    /**
     * Apply gravity for jumping or throwing objects
     * 
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            else if (!this.isAboveGround()){
                this.speedY = 0
            }
        }, 1000 / 25);
    }

    /**
     * Check if the object is above the ground
     * 
     * 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 155;
        }
    }

    /**
     * Check if objects are colliding
     * 
     * 
     */
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

    /**
     * Remove energy by hitting and set the time of the last hit
     * 
     * 
     */
    hit() {
        this.energy -= 5;

        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Return if the passed time is under 1s
     * 
     * 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    } 

    /**
     * Return if the object is dead
     * 
     * 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Set variables if Object has been killed
     * 
     * 
     */
    kill() {
        this.isDead = true;
        this.speed = 0;
    }

    /**
     * Function to play the animation with pictures
     * 
     * @param {Array} images - All pictures from the picture-array
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Move the object to the right
     * 
     * 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Move the object to the left
     * 
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Move the object to the top
     * 
     * 
     */
    jump() {
        this.speedY = 30;
    }
}