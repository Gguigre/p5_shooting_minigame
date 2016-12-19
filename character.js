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
        if (this.state != STATE.MOVE || player.state == STATE.DEAD) {
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

    }

    this.update = function() {
        this.updateDir();
        this.updatePos();
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
    }
}