class Game {

    constructor() {
        this.obstacles = [];
        this.timer = 0;
    }

    start() {

        // create player
        this.player = new Player();
        console.log(this.player.position);
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);
        
        // allow player to move
        this.addEventListeners();

        // add and move obstacles 
        setInterval(() => {
            
            if (this.timer % 5 == 0) {

                // create new obstacle
                const newObstacle = new Obstacle();
                newObstacle.domElement = this.createDomElm(newObstacle);
                this.drawDomElm(newObstacle);
                this.obstacles.push(newObstacle);
            }
            
            // move all obstacles
            this.obstacles.forEach(obstacle => {
                obstacle.moveDown();
                this.drawDomElm(obstacle);
            });
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
}

class boardObject {

    constructor(type) {
        this.className = type;
        this.position = {x: 0, y: 0};
        this.speed = 10;
        this.width = 10;
        this.height = 10;
        this.domElement = null;
    }
}

class Player extends boardObject {

    constructor() {
        super('player');
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
        this.position = {x: 50, y: 0};
    }

    moveDown() {
        this.position.y += this.speed;
    }
}

const game = new Game();
game.start();


