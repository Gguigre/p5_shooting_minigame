function Info(name, x, y) {
    Drawable.call(this);

    this.name = name;
    this.x = x;
    this.y = y;
    this.nbSprites = 1;

    this.getSpriteName = function() {
        return "infos." + this.name;
    }

}