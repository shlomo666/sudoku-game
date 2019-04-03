
import React, { Component } from 'react';
import Board from '../lib/board';
import '../App.css';

class BoardElement extends Component {

    state = {
        dim: this.props.dim
    }

    render() {
        const board = new Board(this.state.dim);
        const sqrt = board.sqrt;
        return (
            <div className="App-header" >
                <button className="Buttons" onClick={() => {
                    const nextState = { ...this.state, page: 'new game' };
                    this.setState(nextState);
                    this.props.onChange(nextState);
                }}>New Game</button>

                <button className="Buttons" onClick={() => {
                    const nextState = { ...this.state, page: 'solver' };
                    this.setState(nextState);
                    this.props.onChange(nextState);
                }}>Solver</button>

                <select className="Buttons" defaultValue={this.state.dim} onInput={(val) => {
                    this.setState({ ...this.state, dim: Number(val.target.value) });
                    // this.props.onChange(this.state);
                }}>
                    <option value="4">4x4</option>
                    <option value="9">9x9</option>
                    <option value="16">16x16</option>
                </select>

                <div>
                    {range(sqrt).map(i => <div key={'a' + i} style={{ display: 'flex' }}>
                        {range(sqrt).map(j => <div key={'b' + j} className="Board-Block">
                            {range(sqrt).map(k => <div key={'l' + k} style={{ display: 'flex' }}>
                                {range(sqrt).map(l => {
                                    const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                                    return <input
                                        key={cell.index}
                                        type="text"
                                        maxLength="2"
                                        readOnly={true}
                                        className="Cell-Mini"
                                        value={cell.value || ''}
                                    />
                                })}
                            </div>)}
                        </div>)}
                    </div>
                    )}
                </div>
            </div >
        )
    }
}

export default BoardElement;

function range(n) {
    return [...Array(n).keys()];
}