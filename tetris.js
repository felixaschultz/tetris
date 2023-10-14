/* Init */
class Tetris {
    constructor() {
        this.canvas = document.getElementById('tetris');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);
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

    }
}

/* Init */
const tetris = new Tetris();