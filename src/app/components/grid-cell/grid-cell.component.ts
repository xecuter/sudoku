import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  animations: [
    trigger('numberPuffedIn', [
      /*state('puffOut', style({opacity: 0, transform: 'scale3d(2, 2, 2)'})),*/
      state('puffIn', style({opacity: 1, transform: 'scale3d(1, 1, 1)'})),
      transition('* => puffIn', [
        style({opacity: 0.1, transform: 'scale3d(1.5, 1.5, 1.5)'}),
        query(':self', stagger(3000, animate('1s ease-out')))
      ])
    ])
  ]
})
export class GridCellComponent implements OnInit {
  @Input() i;
  @Input() j;
  x: number;
  y: number;
  num: any;
  isRelated: boolean;
  isSelected: boolean;
  isEditable: boolean;
  isWrongValue: boolean;
  isHighlighted: boolean;
  isHighlightWrong: boolean;

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit() {
    this.x = this.i;
    this.y = this.j;
    this.sudokuService.addCell(this);
    this.num = '';
  }

  selectGridCell($event) {
    const allCells = this.sudokuService.cells;
    for (let i = 0;  i < allCells.length; i++) {
      for (let j = 0; j < allCells[i].length; j++) {
        allCells[i][j].isSelected = false;
        allCells[i][j].isRelated = false;
      }
    }
    this.isSelected = true;
    // Select the row
    for ( let j = 0; j < allCells.length; j++ ) {
      allCells[this.x][j].isRelated = true;
    }
    // select the column
    for ( let i = 0; i < allCells.length; i++ ) {
      allCells[i][this.y].isRelated = true;
    }
    const boxAtX = this.x - this.x % 3;
    const boxAtY = this.y - this.y % 3;
    for (let i = 0;  i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        allCells[boxAtX + i][boxAtY + j].isRelated = true;
      }
    }
    this.highlightSameNumber(this);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.isEditable && event.key > '0' && event.key <= '9') {
      const enteredNumber = parseInt( event.key, 10 );
      this.isWrongValue = !this.sudokuService.isSafeNumber(this.x, this.y, enteredNumber);
      this.num = enteredNumber;
      this.highlightSameNumber(this);
    }
  }

  onBackspaceKeydown($event) {
    if (this.isEditable) {
      this.num = '';
      this.isWrongValue = false;
      this.highlightSameNumber(this);
    }
  }

  highlightSameNumber(cell: GridCellComponent) {

    const allCells = this.sudokuService.cells;
    const boxX = cell.x - cell.x % 3;
    const boxY = cell.y - cell.y % 3;
    for (let i = 0; i < allCells.length; i++) {
      for (let j = 0; j < allCells[i].length; j++) {
        if (!allCells[i][j].isSelected) {
          allCells[i][j].isHighlighted = cell.num !== '' && allCells[i][j].num === cell.num;
          allCells[i][j].isHighlightWrong = cell.isWrongValue && allCells[i][j].isHighlighted
            && ( (cell.x === i || cell.y === j) || ( (i >= boxX && i < boxX + 3) && (j >= boxY && j < boxY + 3) ));
        }
      }
    }

  }
}
