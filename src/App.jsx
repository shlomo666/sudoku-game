import React, { Component } from 'react';
import './App.css';
import BoardElement from './components/BoardElement';
import MenuElement from './components/MenuElement';
import SolverElement from './components/SolverElement';
import { MenuItems } from './enums/MenuItems';

let initialState;

class App extends Component {
  state = {
    dim: 9,
    page: MenuItems.MENU
  };

  componentWillMount() {
    document.title = 'Sudoku Game';

    const menuItem = window.location.pathname.split('/').pop();
    if (menuItem === MenuItems.NEW_GAME) {
      const { values, locked } = window.location.search
        .slice(1)
        .split('&')
        .map(pair => pair.split('='))
        .map(pair => [pair[0], pair[1].split('').map(ch => parseInt(ch, 16))])
        .reduce((obj, pair) => ((obj[pair[0]] = pair[1]), obj), {});

      this.state.page = MenuItems.NEW_GAME;
      initialState = { values, locked };
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
            const regularPath = window.location.href.split(
              MenuItems.NEW_GAME
            )[0];
            window.history.pushState(regularPath, document.title, regularPath);
            initialState = undefined;
            onChange({ ...state, page: 'menu' });
          }}
        ></BoardElement>
      );
    case MenuItems.MENU:
      return <MenuElement dim={dim} onChange={onChange}></MenuElement>;
    case MenuItems.SOLVER:
      return (
        <SolverElement
          dim={dim}
          onExit={() => onChange({ ...state, page: 'menu' })}
        ></SolverElement>
      );
  }
}

export default App;
