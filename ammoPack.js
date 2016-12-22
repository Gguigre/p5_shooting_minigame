function AmmoPack() {

    Dropable.call(this);

    this.amount = Math.ceil(random(10) + 5);
    this.scl = 3;
    this.nbSprites = 1;

    this.text = this.amount.toString();

    this.activate = function() {
        player.weapon.nbAmmo = constrain(player.weapon.nbAmmo + this.amount, 0, player.weapon.capacity);
        return true;
    }

    this.getSpriteName = function() {
        return "ammoPack";
    }

}