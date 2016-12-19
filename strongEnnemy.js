function StrongEnnemy() {

    Ennemy.call(this);

    this.health = 3;

    this.tint = {
        R: 255,
        G: 55,
        B: 55
    }

    this.touched = function() {
        this.health--;
        this.tint.G += 100;
        this.tint.B += 100;
        if (this.health <= 0) {
            this.state = STATE.DEAD;
        }
    }

}