var player;
var bullets = [];
var ennemies = [];
var nbKills = 0;
var ammos = [];

var directionKeys = [-1, -1, -1, -1];

function generateEnemy() {
        if (ennemies.length <= nbKills+1) {
                ennemies.push(new Ennemy());
                ennemies[ennemies.length - 1].init();
        }
        if (nbKills == 0) {
                var divider = 1;
        } else {
                var divider = Math.ceil(Math.log(nbKills)) + 1;
        }
        var timeout = (random()*10000)/divider;
        if (player.state != "DEAD"){
                setTimeout(generateEnemy, timeout);
        }
}

function generateAmmo() {
        if (ammos.length <= 50) {
                var ammo = new AmmoPack();
                ammos.push(ammo);
        }
        var timeout = (random()*30000);
        if (player.state != "DEAD"){
                setTimeout(generateAmmo, timeout);
        }
}

var shootingSound;
var music;

function preload() {
        shootingSound = loadSound('ressources/sound/gun.mp3');
        music = loadSound('ressources/sound/music.mp3');
        reloadSound = loadSound('ressources/sound/reload.mp3');
        player = new Player();
        player.init();
}

function setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        frameRate(30);
        music.loop();

        player.x = width/2;
        player.y = height/2;
        

        generateEnemy();
        generateAmmo();
}

function draw() {
        background(51);

        if (player.state != "DEAD") {
                player.update();
                player.show();

                if (player.state == "AIMING") {
                        console.log(player.state);
                        stroke(255,0,0,150);
                        img = player.sprites.idle[0];
                        switch (player.dir) {
                                case 'N':
                                        line(player.x + img.width/(4*player.scl),
                                                player.y - img.height/(2*player.scl),
                                                player.x + img.width/(4*player.scl),
                                                0);
                                        break;
                                case 'S':
                                        line(player.x - img.width/(4*player.scl),
                                                player.y + img.height/(2*player.scl),
                                                player.x - img.width/(4*player.scl),
                                                height);
                                        break;
                                case 'W':
                                        line(player.x - img.height/(2*player.scl),
                                                player.y - img.width/(4*player.scl),
                                                0,
                                                player.y - img.width/(4*player.scl));
                                        break;
                                case 'E':
                                        line(player.x + img.height/(2*player.scl),
                                                player.y + img.width/(4*player.scl),
                                                width,
                                                player.y + img.width/(4*player.scl));
                                        break;
                                default:
                                        break;
                        }
                }
        } else {
                textSize(128);
                fill(150,0,0);
                textAlign(CENTER);
                text("Game Over", width/2, height/2);
                fill(255);
        }

        textSize(32);
        fill(255);
        textAlign(LEFT);
        text("Score : "+nbKills, 20, 30);
        textAlign(RIGHT)
        text("Ammo : "+player.nbAmmo, width-20, height-30);

        for (var i = 0 ; i < ennemies.length ; i++) {

                var previousPos = {
                        x: ennemies[i].x,
                        y: ennemies[i].y,
                        dir: ennemies[i].dir
                }

                ennemies[i].update();
                var collide = false;

                for (var j = 0 ; j < ennemies.length ; j++ ){
                        if (i != j && ennemies[i].hits(ennemies[j])) {
                                collide = true;
                        }
                        break;
                }

                if (collide) {
                        ennemies[i].x = previousPos.x;
                        ennemies[i].y = previousPos.y;
                        ennemies[i].dir = previousPos.dir;
                }

                ennemies[i].show();

                if (player.hits(ennemies[i])) {
                        player.state = "DEAD";
                }
        }

        for (var i = ammos.length - 1 ; i >= 0 ; i--) {
                ammos[i].show();

                if(ammos[i].hits(player)) {
                        player.reload(ammos[i].amount);
                        ammos.splice(i,1);
                }
        }

        for (var i = bullets.length - 1 ; i >= 0  ; i--) {
                bullet = bullets[i];
                bullet.update();
                bullet.show();

                for (var j = ennemies.length-1; j >= 0; j--) {
                        var ennemy = ennemies[j];
                        if (bullet.hits(ennemy)) {
                                ennemies.splice(j,1);
                                bullets.splice(i,1);
                                nbKills ++;
                        }
                }

                if (bullet.x < 0
                || bullet.x > width
                || bullet.y < 0
                || bullet.y > height) {
                        bullets.splice(i,1);
                }
        }
}

function keyPressed() {
        if (player.state != "DEAD") {
                if (keyCode === LEFT_ARROW || key == 'Q') {
                        directionKeys[2] = frameCount;
                } else if (keyCode === RIGHT_ARROW || key == 'D') {
                        directionKeys[3] = frameCount;
                } else if (keyCode === UP_ARROW || key == 'Z') {
                        directionKeys[0] = frameCount;
                } else if (keyCode === DOWN_ARROW || key == 'S') {
                        directionKeys[1] = frameCount;
                } else if (key == ' ' || keyCode == ENTER) {
                        player.fire();
                }
                        player.state = "ALIVE";

                if (keyCode == SHIFT) {
                        player.state = "AIMING";
                        player.stop();
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

        if (keyCode === CONTROL) {
                player.state = "ALIVE";
        }
}