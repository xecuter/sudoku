import { Injectable } from '@angular/core';
import {blink} from 'sudoku-matrix';
import {GridCellComponent} from '../components/grid-cell/grid-cell.component';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  cells: GridCellComponent[][];
  public N: number; // Matrix of Sudoku, must me int = (SRN^2)
  public SRN: number; // SqrRoot of N

  constructor() {
    this.N = 9;
    this.SRN = Math.sqrt(this.N);

    this.cells = [];
    for (let i = 0; i < this.N; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.N; j++) {
        this.cells[i][j] = null;
      }
    }
  }

  addCell(cell: GridCellComponent) {
    this.cells[cell.x][cell.y] = cell;
  }

  initSudoku(diffLevel: number) {

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells[i][j].num = 0;
        this.cells[i][j].isEditable = true;
      }
    }

    const grid = blink(diffLevel);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] > 0) {
          this.cells[i][j].num = grid[i][j];
          this.cells[i][j].isEditable = false;
        }
      }
    }
    this.fillUpdateHelper();
  }

  // check in the row for existence
  unUsedInRow( colI: number, num: number): boolean {
    for ( let j = 0; j < this.N; j++ ) {
      if (this.cells[colI][j].num === num) {
        return false;
      }
    }
    return true;
  }

  fillUpdateHelper() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = this.cells[i][j];
        // Consider it only if it is editable.
        cell.options = [];
        if ( cell.isEditable && cell.num === 0 ) {
          // from 1 to 9 check if it is suitable for this cell.
          for (let k = 0; k < 9; k++) {
            if ( this.isSafeNumber(i, j, (k + 1)) ) {
              cell.options.push((k + 1));
            }
          }
        }
      }
    }
  }

  // check in the row for existence
  unUsedInCol(rowY: number, num: number): boolean {
    for (let i = 0; i < this.N; i++ ) {
      if (this.cells[i][rowY].num === num) {
        return false;
      }
    }
    return true;
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(boxAtX: number, boxAtY: number, num: number): boolean {
    for (let i = 0;  i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        if (this.cells[boxAtX + i][boxAtY + j].num === num) {
          return false;
        }
      }
    }
    return true;
  }

  isSafeNumber(x, y, num): boolean {
    return (this.unUsedInRow(x, num)
      && this.unUsedInCol(y, num)
      && this.unUsedInBox((x - x % this.SRN), (y - y % this.SRN), num));
  }

  checkIfCompleted() {
    for (let i = 0;  i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if ( this.cells[i][j].isWrongValue || this.cells[i][j].num === 0 ) {
          return false;
        }
      }
    }
    return true;
  }

  inputNumber(number: number) {
    let isFound = false;
    for (let i = 0;  i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if ( this.cells[i][j].isEditable && this.cells[i][j].isSelected ) {
          this.cells[i][j].isWrongValue = !this.isSafeNumber(this.cells[i][j].x, this.cells[i][j].y, number);
          this.cells[i][j].num = number;
          this.highlightSameNumber(this.cells[i][j]);
          isFound = true;
          break;
        }
      }
      if ( isFound ) { break; }
    }
  }

  highlightSameNumber(cell: GridCellComponent) {
    const boxX = cell.x - cell.x % 3;
    const boxY = cell.y - cell.y % 3;
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.cells[i][j].isSelected) {
          this.cells[i][j].isHighlighted = cell.num !== 0 && this.cells[i][j].num === cell.num;
          this.cells[i][j].isHighlightWrong = cell.isWrongValue && this.cells[i][j].isHighlighted
            && ( (cell.x === i || cell.y === j) || ( (i >= boxX && i < boxX + 3) && (j >= boxY && j < boxY + 3) ));
        }
      }
    }
  }

  numberUsed(num: number): number {
    let count = 0;
    for (let i = 0;  i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j].num === num) {
          count++;
        }
      }
    }
    return count;
  }

}
