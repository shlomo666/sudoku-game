import React, { Component } from 'react';
import '../App.css';

import Board from './board';

class ChoiceDialog {
    constructor(onChange) {
        this.onChange = onChange;
        this.visible = false;
        this.element = null;
        this.cell = null;
    }

    /** @param {Board.Cell} cell */
    show(cell) {
        this.visible = true;
        this.cell = cell;
        this.element = <div style={{ display: 'flex' }}>
            {Array(cell.row.length).fill().map((_, i) => i).map(i => {
                return <button 
                className={"Options-Dialog-Button" + (cell.options[i] ? '' : ' Options-Dialog-Button-Pressed')} 
                onClick={() => {
                    cell.options[i] = !cell.options[i];
                    this.show(cell);
                    this.onChange();
                }}>{i + 1}</button>;
            })}
        </div>;

        this.onChange();
    }

    hide() {
        this.visible = false;
        this.onChange();
    }
}

export default ChoiceDialog;