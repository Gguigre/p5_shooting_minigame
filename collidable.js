function Collidable() {

    Drawable.call(this);

    this.hits = function(other) {
        var d = dist(this.x, this.y, other.x, other.y);
        var dmin = this.size / 2 + other.size / 2;
        return d <= dmin;
    }
}