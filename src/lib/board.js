class Cell {
  constructor(value = 0) {
    /** @type {Cell[]} */
    this.row = [];
    /** @type {Cell[]} */
    this.column = [];
    /** @type {Cell[]} */
    this.block = [];
    this.value = value;
    this.options = [];
    this.locked = false;
    this.fiber = 0;
    this.index = 0;
  }
}

class Board {
  constructor(dim) {
    this.dim = dim;
    const sqrt = (this.sqrt = dim ** 0.5);
    /** @type {Array<Array<Cell>>} */
    this.rows = new Array(dim).fill().map(p => new Array(dim).fill(0));
    /** @type {Array<Array<Cell>>} */
    this.columns = new Array(dim).fill().map(p => new Array(dim).fill(0));
    /** @type {Array<Array<Cell>>} */
    this.blocks = new Array(dim).fill().map(p => new Array(dim).fill(0));
    /** @type {Array<Cell>} */
    this.all = new Array(dim ** 2).fill(0);
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        const cell = new Cell();

        this.rows[i][j] = cell;
        cell.row = this.rows[i];

        this.columns[j][i] = cell;
        cell.column = this.columns[j];

        this.blocks[i - (i % sqrt) + (j - (j % sqrt)) / sqrt][
          (i % sqrt) * sqrt + (j % sqrt)
        ] = cell;
        cell.block = this.blocks[i - (i % sqrt) + (j - (j % sqrt)) / sqrt];

        this.all[i * dim + j] = cell;

        cell.options = [...Array(dim)];
        cell.index = i * dim + j;
      }
    }
  }

  backup() {
    this.backupState = this.all.map(cell => cell.value);
  }

  rollback() {
    this.all.map((cell, i) => (cell.value = this.backupState[i]));
  }

  solve(priority = range(this.dim, 1), ignoreInput) {
    this.backup();
    if (!ignoreInput) {
      this.all.filter(cell => !cell.locked).forEach(cell => (cell.value = 0));
    }

    let i = -1,
      dir = 1;
    /** @type {Cell} */
    let cell = {};
    while (cell) {
      i += dir;
      cell = this.all[i];

      if (!cell || cell.locked) continue;

      let val = cell.value;
      let matchVal = cell => cell.value === val;
      let priorityIdx = priority.indexOf(val);
      do {
        priorityIdx++;
        val = priority[priorityIdx];
      } while (
        priorityIdx < priority.length &&
        (cell.block.some(matchVal) ||
          cell.row.some(matchVal) ||
          cell.column.some(matchVal))
      );
      if (priorityIdx < priority.length) {
        cell.value = val;
        dir = 1;
      } else {
        cell.value = 0;
        dir = -1;
      }
    }

    if (i === -1) {
      this.rollback();
    }
    return i > -1;
  }

  isSolvable(priority = range(this.dim, 1)) {
    this.backup();

    let i = -1,
      dir = 1;
    let foundSolution = false;

    /** @type {Cell} */
    let cell = {};
    while (cell) {
      i += dir;
      cell = this.all[i];

      if (!cell || cell.locked) continue;

      let val = cell.value;
      let matchVal = cell => cell.value === val;
      let priorityIdx = priority.indexOf(val);
      do {
        priorityIdx++;
        val = priority[priorityIdx];
      } while (
        priorityIdx < priority.length &&
        (cell.block.some(matchVal) ||
          cell.row.some(matchVal) ||
          cell.column.some(matchVal))
      );
      if (priorityIdx < priority.length) {
        cell.value = val;
        dir = 1;
      } else {
        cell.value = 0;
        dir = -1;
      }
    }

    if (i === -1) {
      this.rollback();
      return false;
    }

    dir = -1;
    foundSolution = true;

    cell = {};
    while (cell) {
      i += dir;
      cell = this.all[i];

      if (!cell || cell.locked) continue;

      let val = cell.value;
      let matchVal = cell => cell.value === val;
      let priorityIdx = priority.indexOf(val);
      do {
        priorityIdx++;
        val = priority[priorityIdx];
      } while (
        priorityIdx < priority.length &&
        (cell.block.some(matchVal) ||
          cell.row.some(matchVal) ||
          cell.column.some(matchVal))
      );
      if (priorityIdx < priority.length) {
        cell.value = val;
        dir = 1;
      } else {
        cell.value = 0;
        dir = -1;
      }
    }

    this.rollback();
    return i === -1 && foundSolution;
  }

  shuffle_test(difficulty = 5) {
    const visibleCells = getVisibleCellsByDifficulty(difficulty, this.dim);

    this.all.forEach(cell => {
      cell.locked = false;
      cell.value = 0;
    });
    const solvePriority = shuffleArray(range(this.dim, 1));
    this.solve(solvePriority, true);

    const size = this.dim ** 2;
    const shuffledIndexes = shuffleArray(range(size));
    this.all.forEach(cell => (cell.locked = true));

    let i;
    const valsRemoved = [];
    for (i = size - 1; i >= visibleCells; i--) {
      const cell = this.all[shuffledIndexes[i]];
      valsRemoved.push(cell.value);
      cell.locked = false;
      cell.value = 0;
    }
    i++;
    let counter = 0;
    while (!this.isSolvable(solvePriority)) {
      this.all[shuffledIndexes[i]].value = valsRemoved.pop();
      counter++;
    }

    if (counter > 0) {
      console.warn(
        `Shuffle could not stand up to expectations: expected ${visibleCells} visibleCells, got down to ${
          visibleCells - counter
        } visible cells`
      );
      window.currVisible = visibleCells - counter;
    }
  }

  shuffleHard() {
    if (this.dim !== 9) {
      return this.shuffle();
    }

    do {
      this.shuffle();

      let arr;
      do {
        arr = this.getHints();
        arr.forEach(({ cell, value }) => (cell.value = value));
      } while (arr.length > 0);
    } while (this.all.every(c => c.value > 0));

    // TESTING EASIER WHEN COMMENTED OUT
    this.all.filter(c => !c.locked).forEach(c => (c.value = 0));
  }

  shuffle(difficulty = 5) {
    // const startT = performance.now();

    const visibleCells = getVisibleCellsByDifficulty(difficulty, this.dim);

    this.all.forEach(cell => {
      cell.locked = false;
      cell.value = 0;
    });
    const priority = shuffleArray(range(this.dim, 1));
    this.solve(priority, true);
    this.all.forEach(cell => (cell.locked = true));

    const size = this.dim ** 2;
    const shuffledIndexes = shuffleArray(range(size));
    let currVisible = size;
    let i = 0;
    let lastValue, cell, isSolvable;
    do {
      do {
        cell = this.all[shuffledIndexes[i]];
        lastValue = cell.value;
        cell.value = 0;
        cell.locked = false;
        i++;
        currVisible--;
        isSolvable = this.isSolvable(priority);
      } while (isSolvable && currVisible > visibleCells && i < size);

      if (!isSolvable) {
        currVisible++;
        cell.value = lastValue;
        cell.locked = true;
      }
    } while (currVisible > visibleCells && i < size);

    if (currVisible > visibleCells) {
      console.warn(
        `Shuffle could not stand up to expectations: expected ${visibleCells} visibleCells, got down to ${currVisible} visible cells`
      );
      window.currVisible = currVisible;
    }

    // console.log('shuffle took:', performance.now() - startT);
  }

  setFibers() {
    this.all
      .filter(c => !c.value)
      .forEach(c => {
        let fiber = parseInt('1'.repeat(this.dim), 2);
        c.row
          .filter(c => c.value)
          .forEach(cell => (fiber = fiber & ~(1 << (cell.value - 1))));
        c.column
          .filter(c => c.value)
          .forEach(cell => (fiber = fiber & ~(1 << (cell.value - 1))));
        c.block
          .filter(c => c.value)
          .forEach(cell => (fiber = fiber & ~(1 << (cell.value - 1))));
        c.fiber = fiber;
      });
  }

  getHints() {
    this.setFibers();

    const hints = this.all
      .filter(c => !c.value && !(c.fiber & (c.fiber - 1)))
      .map(c => ({ cell: c, value: c.fiber.toString(2).length }));

    for (let n = 1; n <= this.dim; n++) {
      [this.rows, this.columns, this.blocks].forEach(ordersArr => {
        ordersArr.forEach(order => {
          const candidates = order.filter(
            c => !c.value && c.fiber & (1 << (n - 1))
          );
          if (candidates.length === 1) {
            hints.push({
              cell: candidates[0],
              value: n
            });
          }
        });
      });
    }

    return hints;
  }

  getHints_indexes() {
    const hints = [...this.all.keys()]
      .filter(
        i =>
          !this.all[i].value && !(this.all[i].fiber & (this.all[i].fiber - 1))
      )
      .map(i => ({ index: i, value: this.all[i].fiber.toString(2).length }));

    for (let n = 1; n <= this.dim; n++) {
      [this.rows, this.columns, this.blocks].forEach(ordersArr => {
        ordersArr.forEach(order => {
          const candidates = order.filter(
            c => !c.value && c.fiber & (1 << (n - 1))
          );
          if (candidates.length === 1) {
            hints.push({
              index: this.all.indexOf(candidates[0]),
              value: n
            });
          }
        });
      });
    }

    return hints;
  }

  get currentLink() {
    return `new-game?values=${this.all
      .map(p => p.value.toString(16))
      .join('')}&locked=${this.all.map(p => (p.locked ? '1' : '0')).join('')}`;
  }
}

function range(n, start = 0) {
  return Array(n)
    .fill()
    .map((_, i) => i + start);
}

function shuffleArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const idx = Math.floor(Math.random() * arr.length - i) + i;
    [arr[i], arr[idx]] = [arr[idx], arr[i]];
  }
  return arr;
}

const difficultyMap = {
  4: {
    1: 8,
    2: 7,
    3: 6,
    4: 5,
    5: 4
  },
  9: {
    1: 40,
    2: 35,
    3: 30,
    4: 25,
    5: 22
  },
  16: {
    1: 180,
    2: 160,
    3: 140,
    4: 120,
    5: 115 //103
  }
};
function getVisibleCellsByDifficulty(difficulty, dim) {
  return difficultyMap[dim][difficulty];
}

Board.Cell = Cell;

export default Board;
