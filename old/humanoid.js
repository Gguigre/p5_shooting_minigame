function Humanoid() {

        this.move = function(dir) {
                this.dir = dir;
                switch (dir) {
                        case 'N':
                                this.speed.x = 0;
                                this.speed.y = -1;
                                break;
                        case 'S':
                                this.speed.x = 0;
                                this.speed.y = 1;                                
                                break;
                        case 'E':
                                this.speed.x = 1;
                                this.speed.y = 0;                                
                                break;
                        case 'W':
                                this.speed.x = -1;
                                this.speed.y = 0;
                                break;
                        default:
                                break;
                }
        }

        this.hits = function(humanoid) {
                var humanoid_size = min(humanoid.sprites.idle[0].width/(2*humanoid.scl), humanoid.sprites.idle[0].height/(2*humanoid.scl));
                var dist_to_humanoid = dist(this.x, this.y, humanoid.x, humanoid.y);
                return dist_to_humanoid < humanoid_size;
        }
        
        this.stop = function() {
                this.speed.x = 0;
                this.speed.y = 0;
        }

}