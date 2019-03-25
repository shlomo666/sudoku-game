
import React, { Component } from 'react';
import Board from '../lib/board';
import '../App.css';

class BoardElement extends Component {

    state = {
        board: new Board(this.props.dim)
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
                        {range(sqrt).map(j => <div className="Board-Block" >
                            {range(sqrt).map(k => <div style={{ display: 'flex' }}>
                                {range(sqrt).map(l => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                    return <input
                                        type="text"
                                        maxLength="2"
                                        className="Cell"
                                        style={{ backgroundColor: cell.locked ? 'gray' : '', borderColor: cell.locked ? 'gray' : '' }}
                                        value={cell.value || ''}
                                        onChange={e => {
                                            const n = Number(e.target.value || 0);
                                            if (n >= 0 && n <= this.props.dim) {
                                                cell.value = n;
                                                cell.locked = !!cell.value;
                                                this.setState({ board });
                                            }
                                        }}
                                    />
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
                        this.setState({
                            board: new Board(this.props.dim)
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
}

export default BoardElement;

function range(n) {
    return [...Array(n).keys()];
}