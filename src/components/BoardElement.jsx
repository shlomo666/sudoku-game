
import React, { Component } from 'react';
import Board from '../lib/board';
import '../App.css';

const dim = 9;

class BoardElement extends Component {

    state = {
        board: new Board(dim)
    }

    render() {
        const board = this.state.board;
        const sqrt = board.sqrt;
        return (
            <div className="App">
                <header className="App-header">
                    {range(sqrt).map(j => <div style={{ display: 'flex' }}>
                        {range(sqrt).map(i => <div>
                            {range(sqrt).map(l => <div className="Board-Block" style={{ display: 'flex' }}>
                                {range(sqrt).map(k => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                        return <input
                                            type="text"
                                            maxLength="1"
                                            style={{ width: '30px', height: '30px', textAlign: 'center', backgroundColor: cell.locked ? 'gray' : '', borderColor: cell.locked ? 'gray' : '' }}
                                            value={cell.value || ''}
                                            onInput={e => {
                                                cell.value = Number(e.target.value || 0);
                                                cell.locked = !!cell.value;
                                                this.setState({ board });
                                            }}
                                        />
                                })}
                            </div>)}
                        </div>)}
                    </div>
                    )}
                    <div style={{ display: 'flex' }}>
                        <button className="Buttons" onClick={() => { 
                            board.solve(); 
                            this.setState({ board }); 
                        }}>Solve</button>
                        <button className="Buttons" onClick={() => { 
                            this.setState({
                                board: new Board(dim)
                            }); 
                        }}>Reset</button>

                    </div>

                </header>
            </div>
        );
    }
}
// <div style={{ display: 'flex' }}></div>

export default BoardElement;

function range(n) {
    return [...Array(n).keys()];
}