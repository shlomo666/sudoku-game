import React, { Component } from 'react';
import './App.css';
import BoardElement from './components/BoardElement';
import MenuElement from './components/MenuElement';
import SolverElement from './components/SolverElement';
import { MenuItems } from './enums/MenuItems';
import { getQueryParams, onPopState } from './utils/browser';

let initialState;

class App extends Component {
  state = {
    dim: 9,
    page: MenuItems.MENU
  };

  componentWillMount() {
    document.title = 'Sudoku Game';
    onPopState(state => {
      initialState = state;
      this.setState({
        ...this.state,
        page: state ? MenuItems.NEW_GAME : this.state.page
      });
    });

    const { page, values, locked } = getQueryParams();
    if (page === MenuItems.NEW_GAME) {
      initialState = {
        values: values.split('').map(ch => parseInt(ch, 16)),
        locked: locked.split('').map(Number).map(Boolean)
      };

      window.history.replaceState(initialState, document.title);

      this.setState({
        ...this.state,
        page: MenuItems.NEW_GAME
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {getPage(this.state, state => this.setState(state))}
        </header>
      </div>
    );
  }
}

function getPage(state, onChange) {
  const { page, dim } = state;
  switch (page) {
    case MenuItems.NEW_GAME:
      return (
        <BoardElement
          dim={dim}
          initialState={initialState}
          onExit={() => {
            if (initialState) {
              const regularPath = window.location.href.split('?')[0];
              window.history.pushState(null, document.title, regularPath);
              initialState = undefined;
            }
            onChange({ ...state, page: 'menu' });
          }}
        ></BoardElement>
      );
    case MenuItems.SOLVER:
      return (
        <SolverElement
          dim={dim}
          onExit={() => onChange({ ...state, page: 'menu' })}
        ></SolverElement>
      );
    case MenuItems.MENU:
    default:
      return <MenuElement dim={dim} onChange={onChange}></MenuElement>;
  }
}

export default App;
