
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
        })()
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
                        {range(sqrt).map(j => <div>
                            {range(sqrt).map(k => <div className="Board-Block" style={{ display: 'flex' }}>
                                {range(sqrt).map(l => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                    return <input
                                        type="text"
                                        maxLength="2"
                                        readOnly={cell.locked}
                                        className="Cell"
                                        style={{ 
                                            backgroundColor: cell.locked ? 'gray' : (cell.state.highlightedCell ? 'rgba(255,255,255,0.8)' : ''), 
                                            borderColor: cell.locked ? 'gray' : '', 
                                            color: cell.state.highlightedNumber ? 'blue' : '', 
                                            fontWeight: cell.state.highlightedNumber ? 'bolder' : 'bold', 
                                        }}
                                        value={cell.value || ''}
                                        onFocus={(e) => { 
                                            highlightLines(cell); 
                                            this.setState(this.state); 
                                            highlightNumber(cell, board);
                                            if(!cell.locked) {
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
                                            if (n >= 0 && n <= this.props.dim) {
                                                cell.value = n;
                                                this.setState({ board });
                                            }
                                            highlightNumber(cell, board);
                                        }}
                                    />
                                })}
                            </div>)}
                        </div>)}
                    </div>
                    )}
                </div>

                <div style={{ display: 'flex' }}>
                    <button className="Buttons" onClick={() => {
                        if (board.solve()) {
                            this.setState({ board });
                        } else {
                            this.setState({ board, error: 'Cannot be solved!' });
                        }
                    }}>Solve</button>
                    <button className="Buttons" onClick={() => {
                        board.all.filter(c => !c.locked).forEach(c => c.value = 0);
                        board.all.forEach(c => {
                            c.state = { highlightedCell: false, highlightedNumber: false };
                        });
                        this.setState({
                            board
                        });
                    }}>Reset</button>

                    <button className="Buttons" onClick={() => {
                        this.props.onExit();
                    }}>Back To Menu</button>
                </div>
            </div>
        );

        delete this.state.error;
        return page;
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