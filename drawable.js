function Drawable() {
    // Position
    this.x;
    this.y;

    // Display
    this.nbSprites;
    this.sprites = [];
    this.spriteOffset = -1;
    this.scl;

    // Collision
    this.size

    // Movement
    this.speed = 0;

    this.getSize = function() {
        return this.size;
    }

    this.setSprites = function(entityName, nbSprites) {
        this.sprites = getAssetManager().getSprites(entityName, nbSprites);
        this.size = min(this.sprites[0].width, this.sprites[0].height) / this.scl;
        if (this.spriteOffset == -1) {
            this.spriteOffset = Math.ceil(random(0, this.nbSprites));
        }
    }

    this.draw = function() {
        this.setSprites(this.getSpriteName(), this.nbSprites);
        if (this.sprites.length == 0) { return; }
        img = this.sprites[0];
        imageMode(CENTER);
        image(img, this.x, this.y, img.width / this.scl, img.height / this.scl);
    }
}