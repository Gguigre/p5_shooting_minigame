function Explosion(x, y) {
    Collidable.call(this);

    this.x = x;
    this.y = y;

    this.nbSprites = 9;
    this.lifeTime = this.nbSprites;

    this.scl = 0.5;

    this.getSpriteName = function() {
        return "explosion".toLowerCase();
    }

    this.draw = function() {
        this.setSprites(this.getSpriteName(), this.nbSprites);
        if (this.sprites.length == 0) { return; }
        img = this.sprites[frameCount % this.lifeTime];
        imageMode(CENTER);
        image(img, this.x, this.y, img.width / this.scl, img.height / this.scl);
    }

}