class Cell {
    constructor(value = 0) {
        this.row = [];
        this.column = [];
        this.block = [];
        this.value = value;
        this.options = [];
        this.locked = false;
    }
}

class Board {
    constructor(dim) {
        this.dim = dim;
        const sqrt = this.sqrt = dim ** 0.5;
        /** @type {Array<Array<Cell>>} */
        this.rows = new Array(dim).fill().map(p => new Array(dim).fill(0));
        /** @type {Array<Array<Cell>>} */
        this.columns = new Array(dim).fill().map(p => new Array(dim).fill(0));
        /** @type {Array<Array<Cell>>} */
        this.blocks = new Array(dim).fill().map(p => new Array(dim).fill(0));
        /** @type {Array<Cell>} */
        this.all = new Array(dim ** 2).fill(0);
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                const cell = new Cell();

                this.rows[i][j] = cell;
                cell.row = this.rows[i];

                this.columns[j][i] = cell;
                cell.column = this.columns[j];

                this.blocks[i - i % sqrt + (j - j % sqrt) / sqrt][(i % sqrt) * sqrt + j % sqrt] = cell;
                cell.block = this.blocks[i - i % sqrt + (j - j % sqrt) / sqrt];

                this.all[i * dim + j] = cell;
            }
        }
    }

    // toString() {
    //     const sqrt = Math.sqrt(this.dim);
    //     process.stdin.write(Array(this.dim + sqrt).fill('\u001bc'.repeat(this.dim + sqrt)).join('\u001bc') + Array(this.dim + sqrt).fill(' '.repeat(this.dim + sqrt)).join('\n') + Array(this.dim + sqrt).fill('\u001bc'.repeat(this.dim + sqrt)).join('\u001bc'));
    //     let str = '';
    //     for (let a = 0; a < sqrt; a++) {
    //         for (let b = 0; b < sqrt; b++) {
    //             for (let c = 0; c < sqrt; c++) {
    //                 for (let d = 0; d < sqrt; d++) {
    //                     str += this.rows[a * sqrt + b][c * sqrt + d].value;
    //                 }
    //                 str += '|';
    //             }
    //             str += '\n'
    //         }
    //         str += '-'.repeat(this.dim + sqrt) + '\n';
    //     }
    //     return str;
    // }

    solve() {
        let i = -1, dir = 1;
        /** @type {Cell} */
        let cell = {};
        while (cell) {
            i += dir;
            cell = this.all[i];

            if (!cell || cell.locked) continue;

            let val = cell.value;
            do {
                val++;
            }
            while (
                (
                    cell.block.some(cell => cell.value === val)
                    ||
                    cell.row.some(cell => cell.value === val)
                    ||
                    cell.column.some(cell => cell.value === val)
                )
                &&
                val <= this.dim
            );
            if (val <= this.dim) {
                cell.value = val;
                dir = 1;
            } else {
                cell.value = 0;
                dir = -1;
            }
        }
    }
}

// const board = new Board(9);
export default Board;

    // board.cells[3][3].value = 5;
    // board.cells[3][3].locked = true;
    // board.solve();
    // console.log(board.toString());
    // process.stdin.write(Array(12).fill('\033c'.repeat(12)).join('\033c') + Array(12).fill(' '.repeat(12)).join('\n') + Array(12).fill('\033c'.repeat(12)).join('\033c'));