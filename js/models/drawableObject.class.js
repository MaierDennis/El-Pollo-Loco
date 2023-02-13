class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Load image from path
     * 
     * @param {string} path - The path of the Image
     */
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    /**
     * Draw the context
     * 
     * @param {string} ctx - canvas.getContext('2d')
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Load Images from array
     * 
     * @param {string} arr - All paths in the images-array
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draw frames for colliding methodes
     * 
     * @param {string} ctx - canvas.getContext('2d')
     */
    drawFrame(ctx) {
        /*if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        if (this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        if (this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + 50, this.y + 50, this.width - 100, this.height - 100);
            ctx.stroke();
        }

        if (this instanceof SalsaBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }*/
    }
}