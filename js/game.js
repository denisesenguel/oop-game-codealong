class Game {

    start() {
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);
        this.addEventListeners();
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

class Player {
    constructor() {
        this.className = "player";
        this.position = {x: 0, y: 0};
        this.speed = 10;
        this.width = 10;
        this.height = 10;
        this.domElement = null;
    }

    moveLeft() {
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }
}

const game = new Game();
game.start();


