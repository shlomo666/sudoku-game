
import React, { Component } from 'react';
import Board from '../lib/board';
import ChoiceDialog from '../lib/ChoiceDialog';
import '../App.css';

class BoardElement extends Component {

    state = {
        board: (() => {
            const b = new Board(this.props.dim);
            b.shuffleHard();
            // b.shuffle();
            b.all.forEach(c => {
                c.state = { highlightedCell: false, highlightedNumber: false };
            });

            return b;
        })(),
        optionsMode: false
    }

    /** @param {{ dim: number }} props */
    constructor(props) {
        super(props);
        this.isEnded = false;
        this.fullCounter = this.state.board.all.filter(cell => cell.value).length;

        this.choiceDialog = new ChoiceDialog(() => this.setState(this.state));
    }

    render() {
        const board = this.state.board;
        const sqrt = board.sqrt;
        /// for testing:
        window.board = board;
        ///

        const page = (

            <div className="App-header">
                <div>
                    <p style={this.state.error ? {} : { color: '#282c34' }}>{this.state.error || 'something'}</p>
                </div>

                {this.state.optionsMode && this.choiceDialog.visible ?
                    <div>
                        {this.choiceDialog.element}
                    </div>
                    :
                    null
                }

                <div>
                    {range(sqrt).map(i => <div style={{ display: 'flex' }}>
                        {range(sqrt).map(j => <div className="Board-Block">
                            {range(sqrt).map(k => <div style={{ display: 'flex' }}>
                                {range(sqrt).map(l => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                    if (!cell.value && this.state.optionsMode) {
                                        return this.getOptionsCell(cell);
                                    } else {
                                        return this.getNumberCell(cell);
                                    }
                                })}
                            </div>)}
                        </div>)}
                    </div>
                    )}
                </div>

                <div style={{ display: 'flex' }}>
                    <button className="Buttons btn-green" onClick={() => {
                        if (board.solve()) {
                            this.setState(this.state);
                        } else {
                            this.state.error = 'Cannot be solved!';
                            this.setState(this.state);
                        }
                    }}>Solve</button>

                    <button className="Buttons btn-blue" onClick={() => {
                        this.state.optionsMode = !this.state.optionsMode;
                        this.setState(this.state);
                    }}>Toggle Options</button>

                    <button className="Buttons btn-yellow" onClick={() => {
                        board.all.filter(c => !c.locked).forEach(c => c.value = 0);
                        board.all.forEach(c => {
                            c.state = { highlightedCell: false, highlightedNumber: false };
                        });
                        this.setState(this.state);
                    }}>Reset</button>

                    <button className="Buttons btn-red" onClick={() => {
                        this.props.onExit();
                    }}>Exit</button>
                </div>

                <div style={{ display: 'flex' }}>
                    <button className="Buttons btn-blue" onClick={() => {
                        this.showHint();
                    }}>Hint</button>

                    <button className="Buttons btn-blue" onClick={() => {
                        setFibersStrong(board);

                        board.all.filter(c => c.value === 0).forEach(c => {
                            c.options = c.options.map((_, i) => !!(c.fiber & (1 << i)));
                        });

                        this.setState(this.state);
                    }}>Find All Options</button>
                </div>
            </div>
        );

        delete this.state.error;
        return page;
    }

    getNumberCell(cell) {
        const board = this.state.board;

        return <div className="Cell">
            <input
                type="text"
                maxLength="2"
                readOnly={this.isEnded || cell.locked}
                className="Cell"
                style={{
                    backgroundColor: cell.locked ? '#A7A7B4' : (cell.state.highlightedCell ? 'rgba(255,255,255,0.8)' : ''),
                    color: cell.state.highlightedNumber ? 'blue' : '',
                    fontWeight: cell.state.highlightedNumber ? 'bolder' : 'bold',
                }}
                value={cell.value || ''}
                onFocus={(e) => {
                    highlightLines(cell);
                    highlightNumber(cell, board);
                    this.setState(this.state);
                    if (!cell.locked) {
                        e.target.setSelectionRange(0, e.target.value.length);
                    }
                }}
                onBlur={() => {
                    unhighlightLines(cell);
                    highlightNumber(cell, board);
                    this.setState(this.state);
                }}
                onChange={e => {
                    const n = Number(e.target.value || 0);
                    this.changeValueOnBoard(n, cell, board);
                }} />
        </div>;
    }

    changeValueOnBoard(n, cell, board) {
        if (n >= 0 && n <= this.props.dim) {
            if (!!cell.value !== !!n) {
                this.fullCounter += !!n ? 1 : -1;
                if (this.fullCounter === board.dim ** 2) {
                    if (isSolved(board)) {
                        this.setState({ ...this.state, error: 'You Won!' });
                        this.isEnded = true;
                    }
                    else {
                        this.setState({ ...this.state, error: 'Wrong!' });
                        this.isEnded = true;
                    }
                }
            }
            cell.value = n;
            this.setState(this.state);
        }
        highlightNumber(cell, board);
    }

    /** @param {Board.Cell} cell */
    getOptionsCell(cell) {
        const board = this.state.board;

        return <div className="Cell">
            <div
                className="Cell options-container"
                style={this.choiceDialog.cell === cell ? { color: 'blue', backgroundColor: 'beige' } : {}}
                onClick={(e) => {
                    this.choiceDialog.show(cell);
                    this.setState(this.state);
                }}
                onBlur={() => {
                    this.setState(this.state);
                }}
            >
                {cell.options.map((marked, i) =>
                    <div
                        className="options-cell"
                        style={{
                            fontSize: '9px',
                            width: '10px',
                            height: '10px'
                        }}>{marked ? i + 1 : ' '}</div>
                )}
            </div>
        </div>
    }

    showHint() {
        setFibers(this.state.board);
        const hints = getHints(this.state.board);
        console.log(hints);
        const [hint] = hints;
        if (hint) {
            const board = this.state.board;
            const cell = board.all[hint.index];
            highlightLines(cell);
            this.state.error = hint.reason;
            this.changeValueOnBoard(hint.value, cell, board);
            setTimeout(() => {
                unhighlightLines(cell);
            });
        }

        return hint;
    }
}

export default BoardElement;

/** @param {Board.Cell} cell */
/** @param {Board} board */
function highlightNumber(cell, board) {
    board.all.forEach(c => {
        c.state.highlightedNumber = (cell.value === c.value);
    });
}

/** @param {Board.Cell} cell */
/** @param {Board} board */
function highlightLines(cell) {
    cell.row.forEach(p => p.state.highlightedCell = true);
    cell.column.forEach(p => p.state.highlightedCell = true);
}

/** @param {Board.Cell} cell */
function unhighlightLines(cell) {
    cell.row.forEach(p => p.state.highlightedCell = false);
    cell.column.forEach(p => p.state.highlightedCell = false);
}

function range(n) {
    return [...Array(n).keys()];
}


/** @param {Board} board */
function isSolved(board) {
    return (
        board.rows.every(row => new Set(row.map(cell => cell.value)).size === board.dim)
        &&
        board.columns.every(column => new Set(column.map(cell => cell.value)).size === board.dim)
        &&
        board.blocks.every(block => new Set(block.map(cell => cell.value)).size === board.dim)
    );
}

/** @param {Board} board */
function setFibers(board) {
    board.all.filter(c => !c.value).forEach(c => {
        let fiber = parseInt('1'.repeat(board.dim), 2);
        c.row.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.column.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.block.filter(c => c.value).forEach(cell => fiber = fiber & ~(1 << (cell.value - 1)));
        c.fiber = fiber;
    })
}

/** @param {Board} board */
function setFibersStrong(board) {
    setFibers(board);

    let marksCounter = 0, lastMarksCounter;

    while (marksCounter !== lastMarksCounter) {
        lastMarksCounter = marksCounter;
        marksCounter = reduceFibers(board);
    }
}

/** @param {Board} board */
function reduceFibers(board) {
    const { sqrt, dim } = board;
    let marksCounter = 0;

    [
        [board.rows.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].block.filter((_, idx) => Math.floor(idx / sqrt) !== groupI % sqrt)],
        [board.columns.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].block.filter((cell) => cell.index % dim !== groupI % dim)],
        [board.blocks.flat(), (groupI, where, sourceGroup) => sourceGroup[groupI * dim + where * sqrt].row.filter((_, idx) => Math.floor(idx / sqrt) !== groupI % sqrt)],
        [board.blocks.map(block => block.map((c, i, arr) => arr[ Math.floor(i / sqrt) + (i % sqrt) * sqrt ])).flat(), (groupI, where, sourceGroup) => board.blocks[groupI][where].column.filter((cell, idx) => Math.floor(idx / sqrt) !== Math.floor(groupI / sqrt))]
    ].forEach(([sourceGroup, getCellsToRemoveOptionFrom], sourceIdx) => {
        const fibers = toChunks(sourceGroup, sqrt).map(order => order.filter(c => !c.value).reduce((totalFiber, c) => totalFiber | c.fiber, 0));
        const fiberGroups = toChunks(fibers, sqrt);

        range(dim).map(o => 1 << o).forEach(bit => {
            fiberGroups.forEach((group, i) => {
                const marks = group.map(fiber => !!(bit & fiber));
                if (marks.filter(p => p).length === 1) {
                    console.log({ i, option: bit.toString(2).length, marks: marks.toString(), sourceIdx });
                    marksCounter++;
                    const where = marks.indexOf(true);
                    const cellsToRemoveOptionFrom = getCellsToRemoveOptionFrom(i, where, sourceGroup);
                    console.log(cellsToRemoveOptionFrom.map(p => p.index));
                    cellsToRemoveOptionFrom.forEach(cell => cell.fiber = cell.fiber & ~bit);
                }
            });
        });
    })

    return marksCounter;
}

/** @param {Board} board */
function getHints(board) {
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

/** @type {<T>(arr: T[], size: number) => T[][]} */
function toChunks(arr, size) {
    return [...Array(arr.length / size).keys()].map(i => arr.slice(i * size, (i + 1) * size));
}

