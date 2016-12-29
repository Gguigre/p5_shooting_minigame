function Character() {

    Collidable.call(this);

    this.speed = {
        x: 0,
        y: 0,
        value: 0
    }

    this.dir = DIR.N;
    this.health = 1;

    this.touched = function() {
        this.health--;
        if (this.health <= 0) {
            this.state = STATE.DEAD;
        }
    }

    this.stop = function() {
        this.speed.x = 0;
        this.speed.y = 0;
    }

    // PathFinder
    this.updateDir = function() {}

    // Move according to pathFider
    this.updatePos = function() {

        var xStart = this.x;
        var yStart = this.y;

        if (this.state != STATE.MOVE && this.state != STATE.INVINCIBLE || player.state == STATE.DEAD) {
            return;
        }
        switch (this.dir) {
            case DIR.N:
                this.y -= this.speed;
                break;
            case DIR.S:
                this.y += this.speed;
                break;
            case DIR.W:
                this.x -= this.speed;
                break;
            case DIR.E:
                this.x += this.speed;
                break;
            default:
                break;
        }

        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

        if (this.speed > 10) {
            stroke(255, 200);
            line(this.x, this.y, xStart, yStart);
            line(this.x - 10, this.y, xStart - 10, yStart);
            line(this.x + 10, this.y, xStart + 10, yStart);
            line(this.x, this.y - 10, xStart, yStart - 10);
            line(this.x, this.y + 10, xStart, yStart + 10);
        }
    }

    this.update = function() {
        this.updateDir();
        this.updatePos();
        if (this.stamina != undefined) {
            this.stamina = constrain(player.stamina + 1, 0, 150);
        }
    }

    this.draw = function() {
        push();

        // Position
        translate(this.x, this.y);
        switch (this.dir) {
            case DIR.N:
                break;
            case DIR.S:
                rotate(PI);
                break;
            case DIR.W:
                rotate(3 * PI / 2);
                break;
            case DIR.E:
                rotate(PI / 2);
                break;
            default:
                break;
        }

        // Display
        this.setSprites(this.getSpriteName(), this.nbSprites);

        img = this.sprites[(floor(frameCount / 5) + this.spriteOffset) % this.nbSprites];
        imageMode(CENTER);
        if (this.tint.R + this.tint.G + this.tint.B != 3 * 255) {
            tint(this.tint.R, this.tint.G, this.tint.B);
        }
        image(img, 0, 0, img.width / this.scl, img.height / this.scl);
        noTint();

        pop();

        if (this.health > 1 && this.health < 10) {
            var heart = getAssetManager().getSprites("infos.heart", 1)[0];
            var heartScale = 15;
            for (var i = 0; i < this.health; i++) {
                image(heart,
                    this.x - Math.floor(this.health / 2 - i) * heart.width / heartScale,
                    this.y - 1.5 * this.size,
                    heart.width / heartScale,
                    heart.height / heartScale);
                // image(heart, this.x - (this.health / 2 + i) * heart.width / 10, -img.height, heart.width / 10, heart.height / 10);
            }
        }
        if (this.stamina != undefined) {
            if (this.stamina > 100) {
                fill(255, 170, 0, 200);
            } else {
                fill(255, 0, 0, 200);
            }
            rectMode(CENTER);
            rect(this.x, this.y - 35, this.stamina / 1.5, 5);
            if (this.stamina > 100) {
                strokeWeight(2);
                line(this.x + (this.stamina - 100) / 3, this.y - 37, this.x + (this.stamina - 100) / 3, this.y - 33);
                line(this.x - (this.stamina - 100) / 3, this.y - 37, this.x - (this.stamina - 100) / 3, this.y - 33);
                strokeWeight(1);
            }
        }

    }
}