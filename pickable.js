function Pickable() {
    Collidable.call(this);

    this.x = random(width / 5, width - width / 5);
    this.y = random(height / 5, height - height / 5);

    this.draw = function() {

        // Display
        this.setSprites(this.getSpriteName(), this.nbSprites);

        img = this.sprites[0];

        imageMode(CENTER);
        image(img, this.x, this.y, img.width / this.scl, img.height / this.scl);
        textAlign(CENTER);
        textSize(15);
        fill(255);
        text(this.text, this.x, this.y - 20);
    }

}