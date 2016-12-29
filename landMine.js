function LandMine(x, y, id) {

    Dropable.call(this);

    this.x = x;
    this.y = y;
    this.id = id;

    this.scl = 20;
    this.nbSprites = 1;

    this.text = "";

    getAssetManager().getSound("explode");
    getAssetManager().getSprites("explosion", 9);

    setTimeout(function(landmine) {
        landmine.explode();
    }, 1500, this);
    this.activate = function() {
        return false;
    }

    this.getSpriteName = function() {
        return "landMine";
    }

    this.explode = function() {
        for (var j = 0; j < dropables.length; j++) {
            if (dropables[j].getSpriteName() == "landMine") {
                if (dropables[j].id == this.id) {
                    dropables.splice(j, 1);
                }
            }
        }

        getAssetManager().getSound("explode").play();

        explosions.push(new Explosion(this.x, this.y));

        for (var i = ennemies.length - 1; i >= 0; i--) {
            var ennemy = ennemies[i];

            if (dist(ennemy.x, ennemy.y, this.x, this.y) <= 120) {
                ennemies.splice(i, 1);
                player.score++;
            }
        }
    }
}