function Bullet(x,y,dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.r = 2;

    this.speed = 25;

    this.update = function() {
        switch (this.dir) {
                        case "N":
                                this.y += -1*this.speed;
                                break;
                        case "S":
                                this.y += 1*this.speed;
                                break;
                        case "E":
                                this.x += 1*this.speed;
                                break;
                        case "W":
                                this.x += -1*this.speed;
                                break;
                        default:
                                break;
                }
    }

    this.hits = function(ennemy) {
            var ennemy_size = min(ennemy.sprites.idle[0].width/(2*ennemy.scl),
                                ennemy.sprites.idle[0].height/(2*ennemy.scl));
            var dist_to_ennemy = dist(this.x, this.y, ennemy.x, ennemy.y);
            return dist_to_ennemy < ennemy_size;
    }

    this.show = function() {
            noStroke();
            fill(150);
                ellipse(this.x, this.y, this.r*2, this.r*2);
    }

}