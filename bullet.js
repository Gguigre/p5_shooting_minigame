function Bullet(x, y, dir) {

    Collidable.call(this);

    this.x = x;
    this.y = y;
    this.dir = dir;
    this.r = 2;
    this.nbSprites = 1;
    this.size = 2 * this.r;

    this.speed = 1;

    this.update = function() {
        switch (this.dir) {
            case "N":
                this.y += -1 * this.speed;
                break;
            case "S":
                this.y += 1 * this.speed;
                break;
            case "E":
                this.x += 1 * this.speed;
                break;
            case "W":
                this.x += -1 * this.speed;
                break;
            default:
                break;
        }
    }



}