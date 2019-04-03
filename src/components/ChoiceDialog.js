import React from 'react';
import '../App.css';

import Board from '../lib/board';

/** @param {{ dim: number, cell?: Board.Cell, onChange: () => void }} props */
function ChoiceDialog(props) {
    let { dim, cell, onChange } = props;

    return <div style={{ display: 'flex' }}>
        {Array(dim).fill().map((_, i) => i).map(i => {
            return <button
                key={i}
                className={"Options-Dialog-Button" + (cell && cell.options[i] ? '' : ' Options-Dialog-Button-Pressed')}
                onClick={() => {
                    if(cell) {
                        cell.options[i] = !cell.options[i];
                        onChange();
                    }
                }}>{i + 1}</button>;
        })}
    </div>;
}

export default ChoiceDialog;