import React, { Component } from 'react';
import Board from '../lib/board';
import ChoiceDialog from './ChoiceDialog';
import '../App.css';
import { getHints, isSolved, range, setFibersStrong } from '../lib/logic';

class BoardElement extends Component {
  /** @param {{ dim: number, initialState: { values: number[], locked: number[] } }} props */
  constructor(props) {
    super(props);
    const { initialState } = props;

    this.state = {
      board: (() => {
        const b = new Board(this.props.dim);

        if (initialState) {
          b.all.forEach((c, i) => {
            c.value = initialState.values[i];
            c.locked = !!initialState.locked[i];
          });
        } else {
          b.shuffleHard();
          // b.shuffle();
        }
        b.all.forEach(c => {
          c.state = { highlightedCell: false, highlightedNumber: false };
        });

        return b;
      })(),
      optionsMode: false
    };

    this.isEnded = false;
    this.fullCounter = this.state.board.all.filter(cell => cell.value).length;

    this.focusedCell = null;
    // this.choiceDialog = new ChoiceDialog(() => this.setState(this.state));
  }

  render() {
    const { animateCopied } = this.state;
    const board = this.state.board;
    const sqrt = board.sqrt;
    /// for testing:
    window.board = board;
    ///

    const page = (
      <div className="App-header">
        <div
          style={{
            width: 180,
            height: 30
          }}
        >
          <button
            style={{
              width: '100%',
              backgroundColor: animateCopied ? 'green' : 'transparent',
              color: 'white',
              fontSize: 15
            }}
            onClick={() => {
              navigator.clipboard.writeText(window.board.currentLink);
              this.setState({ ...this.state, animateCopied: true });
              setTimeout(() => {
                this.setState({ ...this.state, animateCopied: false });
              }, 2000);
            }}
          >
            {animateCopied ? 'Copied to clipboard!' : 'Copy Current URL'}
          </button>
        </div>
        <div>
          <p style={this.state.error ? {} : { color: '#282c34' }}>
            {this.state.error || 'something'}
          </p>
        </div>

        <div>
          <ChoiceDialog
            dim={board.dim}
            cell={this.focusedCell}
            onChange={() => this.setState(this.state)}
          />
        </div>

        <div>
          {range(sqrt).map(i => (
            <div style={{ display: 'flex' }}>
              {range(sqrt).map(j => (
                <div className="Board-Block">
                  {range(sqrt).map(k => (
                    <div style={{ display: 'flex' }}>
                      {range(sqrt).map(l => {
                        const cell = board.blocks[i * sqrt + j][k * sqrt + l];
                        if (!cell.value && cell.options.some(n => n)) {
                          return this.getOptionsCell(cell);
                        } else {
                          return this.getNumberCell(cell);
                        }
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex' }}>
          <button
            className="Buttons btn-green"
            onClick={() => {
              if (board.solve()) {
                this.setState(this.state);
              } else {
                this.setState({ ...this.state, error: 'Cannot be solved!' });
              }
            }}
          >
            Solve
          </button>

          <button
            className="Buttons btn-yellow"
            onClick={() => {
              board.all
                .filter(c => !c.locked)
                .forEach(c => {
                  c.value = 0;
                  c.options = Array(board.dim).fill();
                });
              board.all.forEach(c => {
                c.state = { highlightedCell: false, highlightedNumber: false };
              });
              this.setState(this.state);
            }}
          >
            Reset
          </button>

          <button
            className="Buttons btn-red"
            onClick={() => {
              this.props.onExit();
            }}
          >
            Exit
          </button>
        </div>

        <div style={{ display: 'flex' }}>
          <button
            className="Buttons btn-blue"
            onClick={() => {
              this.showHint();
            }}
          >
            Hint
          </button>

          <button
            className="Buttons btn-blue"
            onClick={() => {
              setFibersStrong(board);

              board.all
                .filter(c => c.value === 0)
                .forEach(c => {
                  c.options = c.options.map((_, i) => !!(c.fiber & (1 << i)));
                });

              this.setState(this.state);
            }}
          >
            Find All Options
          </button>
        </div>
      </div>
    );

    delete this.state.error;
    return page;
  }

  getNumberCell(cell) {
    const board = this.state.board;

    return (
      <div className="Cell">
        <input
          type="text"
          maxLength="2"
          readOnly={this.isEnded || cell.locked}
          key={cell.index}
          className="Cell"
          style={{
            backgroundColor: cell.locked
              ? '#A7A7B4'
              : cell.state.highlightedCell
              ? 'rgba(255,255,255,0.8)'
              : '',
            color: cell.state.highlightedNumber ? 'blue' : '',
            fontWeight: cell.state.highlightedNumber ? 'bolder' : 'bold'
          }}
          value={cell.value || ''}
          onFocus={e => {
            this.focusedCell = cell.value ? null : cell;

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
            this.focusedCell = cell.value ? null : cell;
          }}
        />
      </div>
    );
  }

  changeValueOnBoard(n, cell, board) {
    if (n >= 0 && n <= this.props.dim) {
      if (!!cell.value !== !!n) {
        this.fullCounter += !!n ? 1 : -1;
        if (this.fullCounter === board.dim ** 2) {
          if (isSolved(board)) {
            this.setState({ ...this.state, error: 'You Won!' });
            this.isEnded = true;
          } else {
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
    const optionCellSize = Math.floor(30 / board.sqrt);

    return (
      <div className="Cell">
        <div
          className="Cell options-container"
          key={cell.index}
          tabIndex="0"
          readOnly={this.isEnded}
          style={
            this.focusedCell === cell
              ? { color: 'blue', backgroundColor: 'beige' }
              : cell.state.highlightedCell
              ? { backgroundColor: 'rgba(255,255,255,0.8)' }
              : {}
          }
          onFocus={e => {
            this.focusedCell = cell;

            highlightLines(cell);
            highlightNumber(cell, board);
            this.setState(this.state);
          }}
          onBlur={() => {
            unhighlightLines(cell);
            highlightNumber(cell, board);
            this.setState(this.state);
          }}
          onKeyUp={e => {
            if (/[0-9]/.test(e.key)) {
              this.changeValueOnBoard(Number(e.key), cell, board);
            }
          }}
        >
          {cell.options.map((marked, i) => (
            <div
              className="options-cell"
              style={{
                fontSize: `${
                  board.sqrt === 4
                    ? (optionCellSize / 2) | 0
                    : optionCellSize - 1
                }px`,
                width: `${optionCellSize}px`,
                height: `${optionCellSize}px`
              }}
            >
              {marked ? i + 1 : ' '}
            </div>
          ))}
        </div>
      </div>
    );
  }

  showHint() {
    setFibersStrong(this.state.board);
    const hints = getHints(this.state.board);
    console.log(hints);
    const [hint] = hints;
    if (hint) {
      const board = this.state.board;
      const cell = board.all[hint.index];
      highlightLines(cell);
      // eslint-disable-next-line react/no-direct-mutation-state
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
    c.state.highlightedNumber = cell.value === c.value;
  });
}

/** @param {Board.Cell} cell */
/** @param {Board} board */
function highlightLines(cell) {
  cell.row.forEach(p => (p.state.highlightedCell = true));
  cell.column.forEach(p => (p.state.highlightedCell = true));
}

/** @param {Board.Cell} cell */
function unhighlightLines(cell) {
  cell.row.forEach(p => (p.state.highlightedCell = false));
  cell.column.forEach(p => (p.state.highlightedCell = false));
}
