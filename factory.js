var factory = null;

function getFactory() {
    if (factory === null) {
        factory = new Factory();
    }
    return factory;
}

function Factory() {

    this.ennemyTimeout = 0;
    this.ammoPackTimeout = 0;

    this.generateLandMine = function() {
        if (player.state == STATE.DEAD) { return; }

        dropables.push(
            new LandMine(
                player.x,
                player.y,
                Math.ceil(Math.random(0, 100))
            )
        );
    }

    this.createAmmoPack = function() {
        if (frameCount >= this.ammoPackTimeout) {
            this.generateAmmoPack();
        }
    }

    this.generateAmmoPack = function() {
        if (player.state == STATE.DEAD) { return; }

        if (dropables.length <= 5) {
            dropables.push(new AmmoPack());
        }
        var divider = Math.ceil(Math.log(player.score + 1)) + 1;

        var timeout = (10000 + random() * 20000) / divider;

        this.ammoPackTimeout += timeout / 30;

    }

    this.createEnnemy = function() {
        if (frameCount >= this.ennemyTimeout) {
            this.generateEnnemy();
        }
    }

    this.generateEnnemy = function() {
        if (player.state == STATE.DEAD) { return; }

        if (ennemies.length <= player.score + 1) {
            if (random() <= 0.7) {
                ennemies.push(new Ennemy());
            } else {
                if (random() <= 0.5) {
                    ennemies.push(new FastEnnemy());
                } else {
                    ennemies.push(new StrongEnnemy());
                }
            }
        }
        var divider = Math.ceil(Math.log(player.score + 1)) + 1;

        var timeout = (2000 + random() * 10000) / divider;

        this.ennemyTimeout += timeout / 30;

    }

    this.generateAmmo = function() {

    }

}