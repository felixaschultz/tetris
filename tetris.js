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
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    /* Update */
    update(event) {
        /* Left */
        if (event.keyCode === 37) {
            if(this.player.pos.x > 0){
                this.player.pos.x--;
            }
        }
        
        /* Right */
        if (event.keyCode === 39) {
            if(this.player.pos.x < this.canvas.width  / 10 - 3){
                this.player.pos.x++;
            }
        }
        
        /* Down */
        if (event.keyCode === 40) {
            if(this.player.pos.y / 10 - 1 < this.canvas.height){
                this.player.pos.y++;
            }

            if(this.player.pos.y === this.canvas.height / 10 - 1){
                this.player.matrix = this.createPiece(this.types[Math.floor(Math.random() * this.types.length)]);
                this.player.pos.x = 10;
                this.player.pos.y = 0;
                this.run();
            }
        }

        /* Up */
        /* if (event.keyCode === 81) {
            this.player.pos.y--;
        } */

    }

    /* Run */
    run() {
        this.draw();
        requestAnimationFrame(() => this.run());
    }

    /* Start */
    start() {
        this.run();
    }
}

/* Init */
const tetris = new Tetris();
tetris.start();

document.addEventListener('keydown', event => {
    tetris.update(event);
});