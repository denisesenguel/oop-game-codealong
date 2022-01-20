class Game {

    constructor() {
        this.obstacles = [];
        this.timer = 0;
    }

    start() {

        // create player
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);
        
        // allow player to move
        this.addEventListeners();

        // add falling obstacles 
        this.intervalID = setInterval(() => {
            
            let skipLastIn = false;

            if (this.timer % 5 == 0) {

                // create new obstacle
                const newObstacle = new Obstacle();
                newObstacle.domElement = this.createDomElm(newObstacle);
                this.drawDomElm(newObstacle);
                this.obstacles.push(newObstacle);

                skipLastIn = true;
            }
            
            // move all obstacles
            this.obstacles.forEach((obstacle, index) => {

                // don't move new obstacle immediately
                if (!(skipLastIn && index == this.obstacles.length - 1)) {
                    
                    obstacle.moveDown();
                    this.drawDomElm(obstacle);

                    this.detectCollision();
                }
            });
            this.timer++;
        }, 1000);

    }

    addEventListeners() {
        
        document.addEventListener("keydown", (event) => {
    
            switch (event.key) {
                case 'ArrowLeft':
                    this.player.moveLeft();
                    break;
                case 'ArrowRight':
                    this.player.moveRight();
                    break;                
            }
            this.drawDomElm(this.player);

            this.detectCollision();
        });
    }

    createDomElm(instance) {

        const htmlTag = document.createElement('div');
        
        htmlTag.className = instance.className;
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";

        const board = document.getElementById('board');
        board.appendChild(htmlTag);

        return htmlTag;
    }

    drawDomElm(instance) {
        
        instance.domElement.style.top = instance.position.y + "vh";
        instance.domElement.style.left = instance.position.x + "vw";
    }

    detectCollision() {

        this.obstacles.forEach(obstacle => {
            
            const xOverlap = (obstacle.position.x < this.player.position.x + this.player.width) && 
                (this.player.position.x < obstacle.position.x + obstacle.width);
            const yOverlap = (obstacle.position.y < this.player.position.y + this.player.height) && 
                (this.player.position.y < obstacle.position.y + obstacle.height);

            if (xOverlap && yOverlap) {
                this.stop();
            }
        });
        
    }

    stop() {
        
        clearInterval(this.intervalID);

        const board = document.getElementById('board');
        board.innerHTML = '<h1 id="game-over">Game Over!</h1>';
    }
}

class boardObject {

    constructor(type) {
        this.className = type;
        this.speed = 10;
        this.width = 10;
        this.height = 10;
        this.position = {x: 0, y: 0};
        this.domElement = null;
    }
}

class Player extends boardObject {

    constructor() {
        super('player');
        this.position.y = 100 - this.height;
    }

    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }
}

class Obstacle extends boardObject {

    constructor() {
        super('obstacle');
        this.position = {x: Math.floor(Math.random() * 100), y: 0};
    }

    moveDown() {
        this.position.y += this.speed;
    }
}

const game = new Game();
game.start();


