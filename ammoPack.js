function AmmoPack() {

    Pickable.call(this);

    this.amount = Math.ceil(random(10) + 5);
    this.scl = 5;
    this.nbSprites = 1;

    this.text = this.amount.toString();

    this.getSpriteName = function() {
        return "ammoPack";
    }

}