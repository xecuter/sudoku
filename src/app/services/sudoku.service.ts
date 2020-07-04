import { Injectable } from '@angular/core';
import {blink, checkMatrix, matrix} from 'sudoku-matrix';
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
        this.cells[i][j].num = '';
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
  }

  // check in the row for existence
  unUsedInRow( colI: number, num: string): boolean {
    for ( let j = 0; j < this.N; j++ ) {
      if (this.cells[colI][j].num === num) {
        return false;
      }
    }
    return true;
  }

  // check in the row for existence
  unUsedInCol(rowY: number, num: string): boolean {
    for (let i = 0; i < this.N; i++ ) {
      if (this.cells[i][rowY].num === num) {
        return false;
      }
    }
    return true;
  }

  // Returns false if given 3 x 3 block contains num.
  unUsedInBox(boxAtX: number, boxAtY: number, num: string): boolean {
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

  unselectAll() {
    for (let i = 0;  i < this.SRN; i++) {
      for (let j = 0; j < this.SRN; j++) {
        this.cells[i][j].isSelected = false;
      }
    }
  }

  checkIfCompleted() {
    for (let i = 0;  i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if ( this.cells[i][j].isWrongValue || this.cells[i][j].num === '' ) {
          return false;
        }
      }
    }
    return true;
  }
}
