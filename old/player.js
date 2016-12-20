function Player() {

        Humanoid.call(this);

        console.log(this.constructor.name)

        this.x = width/2;
        this.y = height/2;
        this.dir = TOP;
        this.speed = {
                x: 0,
                y: 0,
                factor: 7
        };
        this.dir = 'N';
        this.state = "ALIVE";
        this.nbSprites = 20;
        this.sprites = {
                idle : [],
                move : []       
        };
        this.nbAmmo = 25;
        this.scl = 5;
        this.init = function() {
                for (var i = 0; i < this.nbSprites; i++) {
                        this.sprites.idle.push(loadImage("ressources/player/rifle/idle/survivor-idle_rifle_"+i+".png"));
                        this.sprites.move.push(loadImage("ressources/player/rifle/move/survivor-move_rifle_"+i+".png"));
                }
        }

        this.update = function() {var max = -1;
                var indexMax = -1;
                for (var i = 0; i < directionKeys.length; i++) {
                        if (directionKeys[i] > max) {
                                indexMax = i;
                                max = directionKeys[i];
                        }
                }

                switch (indexMax) {
                        case 0:
                                player.move("N");
                                break;
                        case 1:
                                player.move("S");                                
                                break;
                        case 2:
                                player.move("W");                                
                                break;
                        case 3:
                                player.move("E");                                
                                break;
                        default:
                                player.stop();
                                break;
                }
                
                this.x = constrain(this.x + this.speed.x*this.speed.factor, 0, width);
                this.y = constrain(this.y + this.speed.y*this.speed.factor, 0, height);
        }
        
        this.reload = function(amount) {
                this.nbAmmo = constrain(this.nbAmmo + amount, 0, 25);
                reloadSound.play();
        }

        this.stop = function() {
                this.speed.x = 0;
                this.speed.y = 0;
        }

        this.fire = function() {
                if (this.nbAmmo <= 0) {return;} 
                var img = this.sprites.idle[0];
                shootingSound.play();
                switch (this.dir) {
                        case 'N':
                                var bullet = new Bullet(this.x + img.width/(4*this.scl),
                                        this.y - img.height/(2*this.scl),
                                        this.dir);
                                break;
                        case 'S':
                                var bullet = new Bullet(this.x - img.width/(4*this.scl),
                                        this.y + img.height/(2*this.scl),
                                        this.dir);
                                break;
                        case 'W':
                                var bullet = new Bullet(this.x - img.height/(2*this.scl),
                                        this.y - img.width/(4*this.scl),
                                        this.dir);
                                break;
                        case 'E':
                                var bullet = new Bullet(this.x + img.height/(2*this.scl),
                                        this.y + img.width/(4*this.scl),
                                        this.dir);
                                break;
                        default:
                                break;
                }
                bullets.push(bullet);
                this.nbAmmo --;
        }

        this.hits = function(ennemy) {
                var ennemy_size = min(ennemy.sprites.idle[0].width/(2*ennemy.scl),
                                ennemy.sprites.idle[0].height/(2*ennemy.scl));
                var player_size = min(this.sprites.idle[0].width/(2*this.scl),
                                this.sprites.idle[0].height/(2*this.scl));
                var dist_to_ennemy = dist(this.x, this.y, ennemy.x, ennemy.y);
                return dist_to_ennemy < 2*(ennemy_size + player_size)/3;
        }

        this.show = function() {
                push();
                translate(this.x, this.y);
                switch (this.dir) {
                        case 'N':
                                break;
                        case 'S':
                                rotate(PI);
                                break;
                        case 'W':
                                rotate(3*PI/2);
                                break;
                        case 'E':
                                rotate(PI/2);
                                break;
                        default:
                                break;
                }

                var img = this.sprites.idle[0];

                if (this.speed.x != 0 || this.speed.y != 0) {
                        img = this.sprites.move[floor(frameCount/5)%this.nbSprites];
                } else {
                        img = this.sprites.idle[floor(frameCount/5)%this.nbSprites];
                }

                imageMode(CENTER);
                image(img, 0, 0, img.width/this.scl, img.height/this.scl);
                pop();
        }
        
}