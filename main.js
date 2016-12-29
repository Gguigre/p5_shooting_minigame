var player;
var bullets = [];
var ennemies = [];
var dropables = [];
var nbKills = 0;
var ammos = [];
var explosions = [];
var shots = [];
var fpsArr = [];

var music;

var directionKeys = [-1, -1, -1, -1];

function preload() {
    getAssetManager().getSprites("player.rifle.idle", 20);
    getAssetManager().getSprites("player.rifle.move", 20);
    getAssetManager().getSprites("shot", 3);

    getAssetManager().getSprites("ennemy.move", 17);
    getAssetManager().getSprites("ennemy.idle", 17);

    music = getAssetManager().getSound("music");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    player = new Player();
    frameRate(30);

    music.loop();
}

function draw() {
    background(75);

    var fps = frameRate();
    fill(255);
    stroke(0);
    textAlign(LEFT);
    textSize(25);
    text("FPS: " + fps.toFixed(2), 10, height - 10);

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

    for (var i = explosions.length - 1; i >= 0; i--) {
        var explosion = explosions[i];
        explosion.draw();
        explosion.lifeTime--;
        if (explosion.lifeTime <= 0) {
            explosions.splice(i, 1);
        }
    }

    for (var i = shots.length - 1; i >= 0; i--) {
        var shot = shots[i];
        shot.draw();
        shot.lifeTime--;
        if (shot.lifeTime <= 0) {
            shots.splice(i, 1);
        }
    }

    // Bullets
    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];

        var xStart = bullet.x;
        var yStart = bullet.y;

        var tosplice = false;

        for (var j = 0; j < (player.weapon.range / bullet.speed); j++) {
            bullet.update();
            for (var k = ennemies.length - 1; k >= 0; k--) {
                ennemy = ennemies[k];

                if (ennemy.hits(bullet)) {
                    tosplice = true;
                    ennemy.touched();
                    if (ennemy.state == STATE.DEAD) {
                        ennemies.splice(k, 1);
                        player.score++;
                    }
                    break;
                }
            }
            if (bullet.x > width || bullet.y > height || bullet.x < 0 || bullet.y < 0) {
                tosplice = true;
                break;
            }
            if (tosplice) {
                break;
            }
        }
        shots.push(new Shot(xStart, yStart, bullet.x, bullet.y, bullet.dir));
        bullets.splice(i, 1);
    }

    for (var i = dropables.length - 1; i >= 0; i--) {
        var dropable = dropables[i];

        if (dropable.hits(player)) {
            if (dropable.activate()) {
                dropables.splice(i, 1);
            }
        }
        dropable.draw();
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
    }

    textSize(32);
    fill(255);
    textAlign(LEFT);
    text("Score : " + player.score, 20, 30);
    textAlign(RIGHT);
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
        } else if (keyCode == ENTER) {
            player.shoot();
        } else if (key == ' ') {
            player.dash();
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