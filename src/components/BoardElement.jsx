
import React, { Component } from 'react';
import Board from '../lib/board';
import '../App.css';

class BoardElement extends Component {

    state = {
        board: (() => {
            const b = new Board(this.props.dim);
            b.shuffle();
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
                    <p hidden={!this.state.error}>{this.state.error}</p>
                </div>

                <div>
                    {range(sqrt).map(i => <div style={{ display: 'flex' }}>
                        {range(sqrt).map(j => <div className="Board-Block">
                            {range(sqrt).map(k => <div style={{ display: 'flex' }}>
                                {range(sqrt).map(l => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                    if(this.state.optionsMode) {
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
                            this.setState({ board });
                        } else {
                            this.setState({ board, error: 'Cannot be solved!' });
                        }
                    }}>Solve</button>
                    <button className="Buttons btn-yellow" onClick={() => {
                        board.all.filter(c => !c.locked).forEach(c => c.value = 0);
                        board.all.forEach(c => {
                            c.state = { highlightedCell: false, highlightedNumber: false };
                        });
                        this.setState({
                            board
                        });
                    }}>Reset</button>

                    <button className="Buttons btn-red" onClick={() => {
                        this.props.onExit();
                    }}>Exit</button>
                </div>
            </div>
        );

        delete this.state.error;
        return page;
    }

    getNumberCell(cell) {
        const board = this.state.board;

        return <input type="text" maxLength="2" readOnly={this.isEnded || cell.locked} className="Cell" style={{
            backgroundColor: cell.locked ? '#A7A7B4' : (cell.state.highlightedCell ? 'rgba(255,255,255,0.8)' : ''),
            color: cell.state.highlightedNumber ? 'blue' : '',
            fontWeight: cell.state.highlightedNumber ? 'bolder' : 'bold',
        }} value={cell.value || ''} onFocus={(e) => {
            highlightLines(cell);
            this.setState(this.state);
            highlightNumber(cell, board);
            if (!cell.locked) {
                e.target.setSelectionRange(0, e.target.value.length);
            }
        } } onBlur={() => {
            unhighlightLines(cell);
            highlightNumber(cell, board);
            this.setState(this.state);
        } } onChange={e => {
            const n = Number(e.target.value || 0);
            if (n >= 0 && n <= this.props.dim) {
                if (!!cell.value !== !!n) {
                    this.fullCounter += !!n ? 1 : -1;
                    if (this.fullCounter === board.dim ** 2) {
                        if (isSolved(board)) {
                            this.setState({ board, error: 'You Won!' });
                            this.isEnded = true;
                        }
                        else {
                            this.setState({ board, error: 'Wrong!' });
                            this.isEnded = true;
                        }
                    }
                }
                cell.value = n;
                this.setState({ board });
            }
            highlightNumber(cell, board);
        } } />;
    }
    
    getOptionsCell(cell) {
        const board = this.state.board;

        return <input type="text" maxLength="2" readOnly={this.isEnded || cell.locked} className="Cell" style={{
            backgroundColor: cell.locked ? '#A7A7B4' : (cell.state.highlightedCell ? 'rgba(255,255,255,0.8)' : ''),
            color: cell.state.highlightedNumber ? 'blue' : '',
            fontWeight: cell.state.highlightedNumber ? 'bolder' : 'bold',
        }} value={cell.value || ''} onFocus={(e) => {
            highlightLines(cell);
            this.setState(this.state);
            highlightNumber(cell, board);
            if (!cell.locked) {
                e.target.setSelectionRange(0, e.target.value.length);
            }
        } } onBlur={() => {
            unhighlightLines(cell);
            highlightNumber(cell, board);
            this.setState(this.state);
        } } onChange={e => {
            const n = Number(e.target.value || 0);
            if (n >= 0 && n <= this.props.dim) {
                if (!!cell.value !== !!n) {
                    this.fullCounter += !!n ? 1 : -1;
                    if (this.fullCounter === board.dim ** 2) {
                        if (isSolved(board)) {
                            this.setState({ board, error: 'You Won!' });
                            this.isEnded = true;
                        }
                        else {
                            this.setState({ board, error: 'Wrong!' });
                            this.isEnded = true;
                        }
                    }
                }
                cell.value = n;
                this.setState({ board });
            }
            highlightNumber(cell, board);
        } } />;
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