function Collidable() {

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

    this.move = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.hits = function(other) {
        var d = dist(this.x, this.y, other.x, other.y);
        var dmin = this.size / 2 + other.size / 2;
        return d <= dmin;
    }
}