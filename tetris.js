/* Init */
class Tetris {
    constructor() {
        this.canvas = document.getElementById('tetris');
        this.context = this.canvas.getContext('2d');
        this.context.scale(10, 10);
        this.types = ['T', 'O', 'L', 'J', 'I', 'S', 'Z'];
        this.colors = [
            '#FF0000',
            '#00FF00',
            '#0000FF',
            '#FFFF00',
            '#00FFFF',
        ];
        this.player = {
            pos: {
                x: 10,
                y: 0
            },
            matrix: this.createPiece(this.types[Math.floor(Math.random() * this.types.length)])
        };

    }

    /* Create Matrix */
    createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    /* Create Piece */
    createPiece(type) {
        if (type === 'T') {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ];
        }

        if (type === 'O') {
            return [
                [2, 2],
                [2, 2]
            ];
        }

        if (type === 'L') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3]
            ];
        }

        if (type === 'J') {
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0]
            ];
        }

        if (type === 'I') {
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ];
        }

        if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0]
            ];
        }

        if (type === 'Z') {
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0]
            ];
        }
    }

    /* Draw Matrix */
    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = "#FF0000";
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    /* Draw */
    draw() {
        this.context.fillStyle = 'rgb(63, 63, 63)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    /* Update */
    update(event = null) {
        /* Left */
        if (event != null && event.keyCode === 37) {
            if(this.player.pos.x > 0){
                this.player.pos.x-1;
            }
        }
        
        /* Right */
        if (event != null && event.keyCode === 39) {
            if(this.player.pos.x < this.canvas.width  / 10 - 3){
                this.player.pos.x+1;
            }
        }
        
        /* Down */
        if(this.player.pos.y / 10 - 1 < this.canvas.height){
            this.player.pos.y+1;
        }

        if(this.player.pos.y / 10 - 1 == this.canvas.height){
            this.collision();
        }

        if(this.player.pos.y == this.canvas.height / 10 - 1){
            /* this.player.matrix = this.createPiece(this.types[Math.floor(Math.random() * this.types.length)]) */
        }
        

    }

    /* Fall */
    move(event) {
        if(event.keyCode === 40){
            if(this.player.pos.y != this.canvas.height / 10 - 1){
                this.player.pos.y++;
            }
        }

        if(event.keyCode === 38){
            this.player.pos.y--;
        }

        if(event.keyCode === 37){
            if(this.player.pos.x > 0){
                this.player.pos.x--;
            }

            /* no move when brick collided with either the bottom of the canvas or another block */
            if(this.player.pos.x == 0){
                this.player.pos.x = 0;
            }

        }



        if(event.keyCode === 39){
            if(this.player.pos.x < this.canvas.width / 10 - 3){
                this.player.pos.x++;
            }

            /* no move when brick collided with either the bottom of the canvas or another block */
            if(this.player.pos.x == this.canvas.width / 10 - 3){
                this.player.pos.x = this.canvas.width / 10 - 3;
            }

        }
    }

    /* Run */
    run() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.run());
    }

    /* Save */
    save() {
        const currentMatrix = {
            matrix: this.player.matrix,
            pos: this.player.pos
        };
        const currentMatrixArray = localStorage.getItem('tetris') === null ? [] : JSON.parse(localStorage.getItem('tetris'));
        currentMatrixArray.push(currentMatrix);
        localStorage.setItem('tetris', JSON.stringify(currentMatrixArray));
    }

    /* Collison */
    collision() {
        
    }

    /*  */


    /* Start */
    start() {
        this.run();
    }
}

/* Init */
const tetris = new Tetris();
tetris.start();

document.addEventListener('keydown', event => {
    tetris.move(event);
});