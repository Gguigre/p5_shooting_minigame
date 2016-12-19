function Ennemy() {

    Character.call(this);
    this.nbSprites = 17;
    this.speed = 3;
    this.state = STATE.MOVE;

    this.init = function() {
        if (random() < 0.5) {
            // Spawn on side
            this.y = random(height);
            if (random() < 0.5) {
                // Spawn on right
                this.x = 0;
            } else {
                // Spawn on left
                this.x = width;
            }
        } else {
            this.x = random(width);
            if (random() < 0.5) {
                // Spawn on top
                this.y = 0;
            } else {
                // Spawn on bottom
                this.y = height;
            }

        }
        this.scl = 5;
    }
    this.init();

    this.getSpriteName = function() {
        return (this.constructor.name + "." + this.state.toString()).toLowerCase();
    }

    this.updateDir = function() {
        if (player.state == STATE.DEAD) {
            return;
        }
        if (abs(abs(this.x - player.x) - abs(this.y - player.y)) < 30) {

        } else if (abs(this.x - player.x) > abs(this.y - player.y)) {
            if (this.x > player.x) {
                this.dir = DIR.W;
            } else {
                this.dir = DIR.E;
            }
        } else {
            if (this.y > player.y) {
                this.dir = DIR.N;
            } else {
                this.dir = DIR.S;
            }
        }
    }

}