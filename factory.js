var factory = null;

function getFactory() {
    if (factory === null) {
        factory = new Factory();
    }
    return factory;
}

function Factory() {

    this.ennemyTimeout = 0;
    this.ammoTimeout = 0;

    this.createAmmoPack = function() {
        if (frameCount >= this.ammoTimeout) {
            this.generateAmmoPack();
        }
    }

    this.generateAmmoPack = function() {
        if (player.state == STATE.DEAD) { return; }

        if (ammoPacks.length <= player.score + 1) {
            ammoPacks.push(new AmmoPack());
        }
        var divider = Math.ceil(Math.log(player.score + 1)) + 1;

        var timeout = (2000 + random() * 10000) / divider;

        this.AmmoPackTimeout += timeout / 30;

    }

    this.createEnnemy = function() {
        if (frameCount >= this.ennemyTimeout) {
            this.generateEnnemy();
        }
    }

    this.generateEnnemy = function() {
        if (player.state == STATE.DEAD) { return; }

        if (ennemies.length <= player.score + 1) {
            ennemies.push(new Ennemy());
        }
        var divider = Math.ceil(Math.log(player.score + 1)) + 1;

        var timeout = (2000 + random() * 10000) / divider;

        this.ennemyTimeout += timeout / 30;

    }

    this.generateAmmo = function() {

    }

}