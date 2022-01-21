class Game {

    constructor() {
        this.obstacles = [];
        this.timer = 0;
    }

    start() {

        // toggle displays
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('board').style.display = 'block';

        // create player
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);
        
        // allow player to move
        this.addEventListeners();

        // add falling obstacles 
        this.intervalID = setInterval(() => {
            
            let skipLastIn = false;
            let removeFromArray = false;

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
                    
                    if (obstacle.position.y == 100 - obstacle.width) {
                        this.rmDomElm(obstacle);
                        removeFromArray = true;
                    } else {
                        obstacle.moveDown();
                        this.drawDomElm(obstacle);
                        this.detectCollision(obstacle);
                    }
                }
            });
            
             if (removeFromArray) this.obstacles.shift();

            this.timer++;
        }, 500);

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

            this.obstacles.forEach(obstacle => {
                this.detectCollision(obstacle);
            });
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

    rmDomElm(instance) {
        const board = document.getElementById('board');
        board.removeChild(instance.domElement);
    }

    detectCollision(obstacle) {

        const xOverlap = (obstacle.position.x < this.player.position.x + this.player.width) && 
            (this.player.position.x < obstacle.position.x + obstacle.width);
        const yOverlap = (obstacle.position.y < this.player.position.y + this.player.height) && 
            (this.player.position.y < obstacle.position.y + obstacle.height);

        if (xOverlap && yOverlap) {
            this.stop();
        }
        
    }

    stop() {
        
        clearInterval(this.intervalID);

        const board = document.getElementById('board');
        const gameOver = document.getElementById('game-over');

        board.innerHTML = "";
        board.style.display = 'none';
        gameOver.style.display = 'flex';
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
        if (this.position.x >= this.speed) {
            this.position.x -= this.speed;
        }
    }

    moveRight() {
        const newPos = this.position.x + this.speed;
        if (newPos <= 100 - this.width) this.position.x = newPos;
    }
}

class Obstacle extends boardObject {

    constructor() {
        super('obstacle');
        this.position = {
            x: Math.floor(Math.random() * (100-this.width)), 
            y: 0
        };
    }

    moveDown() {
        const newPos = this.position.y + this.speed;
        if (newPos <= 100 - this.height) this.position.y = newPos;
    }
}

const game = new Game();
game.start();

document.getElementById('play-again').addEventListener('click', () => {
    
    delete game;
    const game = new Game();
    console.log(game);
    game.start();
});


