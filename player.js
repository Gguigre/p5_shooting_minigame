function Player() {

    Character.call(this);
    this.nbSprites = 20;
    this.state = STATE.IDLE;
    this.tint = {
        R: 255,
        G: 255,
        B: 255
    }

    this.health = 5;
    this.invincible = false;
    this.score = 0;

    this.weapon = new Weapon("rifle",
        25, {
            shoot: getAssetManager().getSound("gun"),
            reload: getAssetManager().getSound("reload")
        }
    );

    this.speed = 7;

    this.touched = function() {
        if (player.invincible == true) {
            return;
        }
        this.health--;
        if (this.health <= 0) {
            this.state = STATE.DEAD;
        } else {
            player.state = STATE.INVINCIBLE;
            player.invincible = true;
            setTimeout(function() {
                player.state = STATE.MOVE;
                player.invincible = false;
            }, 1500);
            getFactory().generateLandMine();
        }
    }

    this.init = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.scl = 5;
    }
    this.init();

    this.getSpriteName = function() {
        return (this.constructor.name + "." + this.weapon.name + "." + this.state.toString()).toLowerCase();
    }

    this.shoot = function() {
        if (this.weapon.nbAmmo <= 0) {
            this.weapon.sounds.reload.play();
            return;
        }
        this.weapon.sounds.shoot.play();
        var img = this.sprites[0];
        switch (this.dir) {
            case 'N':
                var bullet = new Bullet(this.x + img.width / (4 * this.scl),
                    this.y - img.height / (2 * this.scl),
                    this.dir);
                break;
            case 'S':
                var bullet = new Bullet(this.x - img.width / (4 * this.scl),
                    this.y + img.height / (2 * this.scl),
                    this.dir);
                break;
            case 'W':
                var bullet = new Bullet(this.x - img.height / (2 * this.scl),
                    this.y - img.width / (4 * this.scl),
                    this.dir);
                break;
            case 'E':
                var bullet = new Bullet(this.x + img.height / (2 * this.scl),
                    this.y + img.width / (4 * this.scl),
                    this.dir);
                break;
            default:
                break;
        }
        bullets.push(bullet);
        this.weapon.nbAmmo--;
    }

    this.updateDir = function() {

        if (this.state == STATE.DEAD) {
            return;
        }

        var sum = directionKeys.reduce((pv, cv) => pv + cv, 0);

        var i = -1;
        if (sum != -4) {
            i = directionKeys.indexOf(Math.max(...directionKeys));
        } else {
            this.state = STATE.IDLE;
        }

        switch (i) {
            case 0:
                this.dir = DIR.N;
                break;
            case 1:
                this.dir = DIR.S;
                break;
            case 2:
                this.dir = DIR.W;
                break;
            case 3:
                this.dir = DIR.E;
                break;
            default:
                break;
        }
    }

}