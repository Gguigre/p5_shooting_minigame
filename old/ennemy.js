function Ennemy() {

    Humanoid.call(this);

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

    this.dir = TOP;
    this.speed = {
        x: 0,
        y: 0,
        factor: 3
    };
    this.dir = 'N';

    this.nbSprites = 17;
    this.spriteOffset = random(0, this.nbSprites);
    this.sprites = {
        idle: [],
        move: []
    };

    this.scl = 5;

    this.init = function() {
        for (var i = 0; i < this.nbSprites; i++) {
            this.sprites.idle.push(loadImage("ressources/zombie/idle/skeleton-idle_" + i + ".png"));
            this.sprites.move.push(loadImage("ressources/zombie/move/skeleton-move_" + i + ".png"));
        }
    }

    this.hits = function(ennemy) {
        var ennemy_size = min(ennemy.sprites.idle[0].width / (2 * ennemy.scl),
            ennemy.sprites.idle[0].height / (2 * ennemy.scl));
        var dist_to_ennemy = dist(this.x, this.y, ennemy.x, ennemy.y);
        return dist_to_ennemy < 2 * ennemy_size;
    }

    this.update = function() {
        if (player.state != "DEAD") {
            if (abs(abs(this.x - player.x) - abs(this.y - player.y)) < 30) {

            } else if (abs(this.x - player.x) > abs(this.y - player.y)) {
                if (this.x > player.x) {
                    this.move('W');
                } else {
                    this.move('E');
                }
            } else {
                if (this.y > player.y) {
                    this.move('N');
                } else {
                    this.move('S');
                }
            }
        }

        this.x = constrain(this.x + this.speed.x * this.speed.factor, 0, width);
        this.y = constrain(this.y + this.speed.y * this.speed.factor, 0, height);
    }

    this.show = function() {
        push();
        translate(this.x, this.y);
        switch (this.dir) {
            case 'N':
                break;
            case 'S':
                rotate(PI);
                break;
            case 'W':
                rotate(3 * PI / 2);
                break;
            case 'E':
                rotate(PI / 2);
                break;
            default:
                break;
        }

        var img = this.sprites.idle[0];

        if (this.speed.x != 0 || this.speed.y != 0) {
            img = this.sprites.move[floor(frameCount / 5 + this.spriteOffset) % this.nbSprites];
        } else {
            img = this.sprites.idle[floor(frameCount / 5 + this.spriteOffset) % this.nbSprites];
        }

        imageMode(CENTER);
        image(img, 0, 0, img.width / this.scl, img.height / this.scl);
        pop();
    }

}