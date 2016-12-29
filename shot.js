function Shot(xStart, yStart, xEnd, yEnd, dir) {

    Drawable.call(this);

    this.dir = dir;

    this.xStart = xStart;
    this.xEnd = xEnd;
    this.yStart = yStart;
    this.yEnd = yEnd;

    this.nbSprites = 3;
    this.lifeTime = this.nbSprites;

    this.getSpriteName = function() {
        return "shot";
    }

    this.draw = function() {
        this.setSprites(this.getSpriteName(), this.nbSprites);
        if (this.sprites.length == 0) { return; }
        img = this.sprites[this.nbSprites - this.lifeTime];
        imageMode(CENTER);

        push();
        translate((this.xStart + this.xEnd) / 2, (this.yStart + this.yEnd) / 2);
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

        var d = dist(this.xStart, this.yStart, this.xEnd, this.yEnd)
        var scl = img.height / d;
        image(img, 0, 0, img.width / 2, img.height / scl);
        pop();
    }
}