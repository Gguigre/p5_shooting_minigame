function Collidable() {

    this.x;
    this.y;

    this.sprites;
    this.scl;

    this.size;

    this.getSize = function() {
        return this.size;
    }

    this.setSprites(entityName, nbSprites) {
        this.sprites = getAssetManager().getSprites(entityNale, nbSprites);
        this.size = min(this.sprites[0].width, this.sprites[0].height)/this.scl;
    }

    this.move = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.hits = function(other) {
        var d = dist(this.x, this.y, other.x, other.y);
        var dmin = this.size/2+
    }

}