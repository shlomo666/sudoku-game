import React, { Component } from 'react';
import './App.css';
import BoardElement from './components/BoardElement';
import MenuElement from './components/MenuElement';
import SolverElement from './components/SolverElement';

class App extends Component {
  state = {
    dim: 9,
    page: 'menu'
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {getPage(this.state, state => this.setState(state))}
        </header>
      </div>
    )
  }
}

function getPage(state, onChange) {
  switch(state.page) {
    case 'new game': return <BoardElement dim={state.dim} onExit={() => onChange({ ...state, page: 'menu' })}></BoardElement>
    case 'menu': return <MenuElement dim={state.dim} onChange={onChange}></MenuElement>
    case 'solver': return <SolverElement dim={state.dim} onExit={() => onChange({ ...state, page: 'menu' })}></SolverElement>
  }
}

export default App;
