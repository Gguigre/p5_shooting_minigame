function AmmoPack() {

    this.x = random(width/5, width - width/5);
    this.y = random(height/5, height - height/5);
    this.amount = Math.ceil(random(10)+5);
    this.scl = 5;
    this.img = loadImage("ressources/ammoPack/ammoPack.png");

    this.show = function() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.img.width/this.scl, this.img.height/this.scl);
        textAlign(CENTER);
        textSize(15);
        text(this.amount, this.x, this.y - 20);
    }

    this.hits = function(player){
        return dist(player.x, player.y, this.x, this.y) <= max(this.img.width/this.scl, this.img.height/this.scl);
    }

}