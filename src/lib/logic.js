import Board from './board';

export function range(n) {
    return [...Array(n).keys()];
}

/** @param {Board} board */
export function isSolved(board) {
    return (
        board.rows.every(row => new Set(row.map(cell => cell.value)).size === board.dim)
        &&
        board.columns.every(column => new Set(column.map(cell => cell.value)).size === board.dim)
        &&
        board.blocks.every(block => new Set(block.map(cell => cell.value)).size === board.dim)
    );
}

/** @param {Board} board */
export function setFibers(board) {
    board.all.forEach(c => {
        if (c.value) {
            c.fiber = 0;
            return;
        }

        let fiber = (1 << board.dim) - 1;
        c.row.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.column.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.block.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.fiber = fiber;
    })
}

/** @param {Board} board */
export function setFibersStrong(board) {
    setFibers(board);

    let fibersBefore;

    do {
        fibersBefore = board.all.map(c => c.fiber);
        reduceFibers1(board);
        reduceFibers2(board);
        reduceFibers3(board);
        swordfish(board);
    } while (board.all.some((c, i) => c.fiber !== fibersBefore[i]));
}

/** @param {Board} board */
export function reduceFibers1(board) {
    const { sqrt, dim } = board;

    [
        [board.rows.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].block.filter((_, idx) => Math.floor(idx / sqrt) !== groupI % sqrt)],
        [board.columns.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].block.filter((cell) => cell.index % dim !== groupI % dim)],
        [board.blocks.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].row.filter((_, idx) => Math.floor(idx / sqrt) !== groupI % sqrt)],
        [board.blocks.map(block => block.map((c, i, arr) => arr[Math.floor(i / sqrt) + (i % sqrt) * sqrt])).flat(), (groupI, where, sourceGroup) => board.blocks[groupI][where].column.filter((cell, idx) => Math.floor(idx / sqrt) !== Math.floor(groupI / sqrt))]
    ].forEach(([sourceGroup, getCellsToRemoveOptionFrom], sourceIdx) => {
        const fibers = toChunks(sourceGroup, sqrt).map(order => order.filter(c => !c.value).reduce((totalFiber, c) => totalFiber | c.fiber, 0));
        const fiberGroups = toChunks(fibers, sqrt);

        range(dim).map(o => 1 << o).forEach(bit => {
            fiberGroups.forEach((group, i) => {
                const marks = group.map(fiber => !!(bit & fiber));
                if (marks.filter(p => p).length === 1) {
                    const where = marks.indexOf(true);
                    const cellsToRemoveOptionFrom = getCellsToRemoveOptionFrom(i, where, sourceGroup);
                    cellsToRemoveOptionFrom.forEach(cell => cell.fiber = cell.fiber & ~bit);
                }
            });
        });
    });
}

/** @param {Board} board */
export function reduceFibers2(board) {
    const isHaving2Bits = isHavingBits.bind(null, 2);

    const ordersArr = [board.rows, board.columns, board.blocks];
    const triggeredArr = [new Set(), new Set(), new Set()];

    let foundNew = false;
    do {
        foundNew = false;
        for (let oArrIdx = 0; oArrIdx < ordersArr.length; oArrIdx++) {
            const triggered = triggeredArr[oArrIdx];

            for (const order of ordersArr[oArrIdx]) {
                const having2Bits = order.filter(isHaving2Bits);
                for (let i = 0; i < having2Bits.length; i++) {
                    if (triggered.has(having2Bits[i].index)) continue;

                    const fiber = having2Bits[i].fiber;
                    for (let j = i + 1; j < having2Bits.length; j++) {

                        if (fiber === having2Bits[j].fiber) {
                            triggered.add(having2Bits[i].index).add(having2Bits[j].index); // found their match - can't be used again in the orderSet
                            foundNew = true;
                            console.log('reduceFibers2', having2Bits[i].index, having2Bits[j].index);
                            for (const cell of order) {
                                if (cell.fiber && (cell.fiber !== fiber)) {
                                    cell.fiber = cell.fiber & ~(fiber);
                                }
                            }
                        }
                    }
                }
            }
        }
    } while (foundNew);
}

/** @param {Board} board */
export function reduceFibers3(board) {
    const isHaving2to3Bits = (cell) => isHavingBits(2, cell) || isHavingBits(3, cell);

    const ordersArr = [board.rows, board.columns, board.blocks];
    const triggeredArr = [new Set(), new Set(), new Set()];

    let foundNew = false;
    do {
        foundNew = false;
        for (let oArrIdx = 0; oArrIdx < ordersArr.length; oArrIdx++) {
            const triggered = triggeredArr[oArrIdx];

            for (const order of ordersArr[oArrIdx]) {
                const having2to3Bits = order.filter(isHaving2to3Bits);
                for (let i = 0; i < having2to3Bits.length; i++) {
                    if (triggered.has(having2to3Bits[i].index)) continue;
                    for (let j = i + 1; j < having2to3Bits.length; j++) {
                        if (triggered.has(having2to3Bits[j].index)) continue;
                        for (let k = j + 1; k < having2to3Bits.length; k++) {
                            if (triggered.has(having2to3Bits[k].index)) continue;
                            
                            const fiber = having2to3Bits[i].fiber | having2to3Bits[j].fiber | having2to3Bits[k].fiber;
                            
                            if (isHaving2to3Bits({fiber})) {
                                const idxs = [i, j, k].map(idx => having2to3Bits[idx].index);
                                idxs.forEach(triggered.add.bind(triggered)); // found their match - can't be used again in the orderSet
                                const bitsToRemove = fiber;
                                console.log('reduceFibers3', ...idxs);
                                for (const cell of order) {
                                    if (cell.fiber && !idxs.includes(cell.index)) {
                                        cell.fiber = cell.fiber & ~(bitsToRemove);
                                    }
                                }

                                foundNew = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    } while (foundNew);
}

export function isHavingBits(bits, cell) {
    let counter = 0;
    let fiber = cell.fiber;
    do {
        counter += fiber & 1;
    } while (counter <= bits && (fiber = fiber >> 1));

    return counter === bits;
}

/** @param {Board} board */
export function getHints(board) {
    const hints = [...board.all.keys()]
        .filter(i => !board.all[i].value && !(board.all[i].fiber & (board.all[i].fiber - 1)))
        .map(i => ({
            index: i,
            value: board.all[i].fiber.toString(2).length,
            reason: 'The only available option for this cell'
        }));

    range(board.dim).forEach(o => {
        const value = o + 1;
        const bit = 1 << o;
        [
            [board.rows, `only candidate for ${value} in row`],
            [board.columns, `only candidate for ${value} in column`],
            [board.blocks, `only candidate for ${value} in block`]
        ].forEach(([ordersArr, reason]) => {
            ordersArr.forEach(order => {
                const candidates = order.filter(c => !c.value && (c.fiber & bit));
                if (candidates.length === 1) {
                    hints.push({
                        index: board.all.indexOf(candidates[0]),
                        value,
                        reason
                    });
                }
            });
        });
    });

    return hints;
}

/** @param {Board} board */
export function swordfish(board) {
    // https://www.kristanix.com/sudokuepic/sudoku-solving-techniques.php
    // find columns where number is avaliable only in 2 cells.
    // if one of their rows is also the same - add to trail
    // if trail goes back - great.
    // if not - move on

    for(const n of range(board.dim)) {
        const hasN = cell => cell.fiber & (1 << (n - 1));
        /** @type {Board.Cell[]} */
        const columnsWithOnly2N = board.columns.map(column => column.filter(hasN)).filter(column => column.length === 2).flat();
        if(columnsWithOnly2N.length >= 4) {
            const map = new Map();
            columnsWithOnly2N.forEach(cell => {
                let row = map.get(cell.row);
                if(!row) {
                    row = [];
                    map.set(cell.row, row);
                }
                row.push(cell.index);
            });
            const rows = [...map.values()];
            if(rows.every(row => row.length === 2)) {
                console.log('swordfish', rows);
                rows.forEach(row => {
                    board.all[row[0]].row.filter(c => c.index !== row[0] && c.index !== row[1])
                    .forEach(c => removeOptionFromFiber(c, n));
                });
            }
        }
    }
}

function removeOptionFromFiber(cell, n) {
    cell.fiber = cell.fiber & ~(1 << (n - 1));
}

/** @type {<T>(arr: T[], size: number) => T[][]} */
export function toChunks(arr, size) {
    return [...Array(arr.length / size).keys()].map(i => arr.slice(i * size, (i + 1) * size));
}
