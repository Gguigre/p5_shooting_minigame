var player;
var bullets = [];
var ennemies = [];
var pickables = [];
var nbKills = 0;
var ammos = [];

var directionKeys = [-1, -1, -1, -1];

function preload() {
    getAssetManager().getSprites("player.rifle.idle", 20);
    getAssetManager().getSprites("player.rifle.move", 20);

    getAssetManager().getSprites("ennemy.move", 17);
    getAssetManager().getSprites("ennemy.idle", 17);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    player = new Player();
    frameRate(30);
}

function draw() {
    background(75);

    player.update();
    player.draw();

    getFactory().createEnnemy();
    getFactory().createAmmoPack();

    // GAME OVER
    if (player.state == STATE.DEAD) {
        textSize(128);
        fill(180, 0, 0);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2);
        fill(255);
    }

    // Bullets
    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];

        bullet.update();
        bullet.draw();
    }

    for (var i = pickables.length - 1; i >= 0; i--) {
        var pickable = pickables[i];

        if (pickable.hits(player)) {
            pickable.activate();
            pickables.splice(i, 1);
        }

        pickable.draw();
    }

    // Ennemies
    for (var i = ennemies.length - 1; i >= 0; i--) {
        var ennemy = ennemies[i];

        var collide = false;
        var oldPos = {
            x: ennemy.x,
            y: ennemy.y
        }
        ennemy.updatePos();
        for (var j = 0; j < ennemies.length; j++) {
            if (i != j && ennemy.hits(ennemies[j])) {
                collide = true;
                break;
            }
        }
        ennemy.x = oldPos.x;
        ennemy.y = oldPos.y;

        if (!collide) {
            ennemy.update();
        } else {
            ennemy.updateDir();
        }
        ennemy.draw();

        if (player.hits(ennemy)) {
            player.touched();
        }

        for (var j = bullets.length - 1; j >= 0; j--) {
            var bullet = bullets[j];
            if (ennemy.hits(bullet)) {
                bullets.splice(j, 1);
                ennemy.touched()
                if (ennemy.state == STATE.DEAD) {
                    ennemies.splice(i, 1);
                    player.score++;
                }
            }
        }
    }

    textSize(32);
    fill(255);
    textAlign(LEFT);
    text("Score : " + player.score, 20, 30);
    textAlign(RIGHT)
    text(player.weapon.nbAmmo + "/" + player.weapon.capacity, width - 20, height - 30);
    var bulletImg = new Info("bullet", width - 140, height - 40);
    bulletImg.draw();
    var bulletImg = new Info("weapon." + player.weapon.name, width - 100, height - 100);
    bulletImg.draw();

}


function keyPressed() {
    if (player.state != STATE.DEAD) {
        if (keyCode === LEFT_ARROW || key == 'Q') {
            directionKeys[2] = frameCount;
            if (player.state != STATE.INVINCIBLE) { player.state = STATE.MOVE; }
        } else if (keyCode === RIGHT_ARROW || key == 'D') {
            directionKeys[3] = frameCount;
            if (player.state != STATE.INVINCIBLE) { player.state = STATE.MOVE; }
        } else if (keyCode === UP_ARROW || key == 'Z') {
            directionKeys[0] = frameCount;
            if (player.state != STATE.INVINCIBLE) { player.state = STATE.MOVE; }
        } else if (keyCode === DOWN_ARROW || key == 'S') {
            directionKeys[1] = frameCount;
            if (player.state != STATE.INVINCIBLE) { player.state = STATE.MOVE; }
        } else if (key == ' ' || keyCode == ENTER) {
            player.shoot();
        }

        if (keyCode == SHIFT) {
            player.stop();
            player.state = STATE.AIM;
            directionKeys = [-1, -1, -1, -1];
        }
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || key == 'Q') {
        directionKeys[2] = -1;
        player.stop();
    } else if (keyCode === RIGHT_ARROW || key == 'D') {
        directionKeys[3] = -1;
        player.stop();
    } else if (keyCode === UP_ARROW || key == 'Z') {
        directionKeys[0] = -1;
        player.stop();
    } else if (keyCode === DOWN_ARROW || key == 'S') {
        directionKeys[1] = -1;
        player.stop();
    }

    if (keyCode === SHIFT) {
        var sum = directionKeys.reduce((pv, cv) => pv + cv, 0);
        if (sum != -4) {
            if (player.state != STATE.INVINCIBLE) { player.state = STATE.MOVE; }
        } else {
            player.state = STATE.IDLE;
        }
    }
}