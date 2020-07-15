import {Component, Input, OnInit} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {GameService} from '../../services/game.service';

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
  options: number[];
  num: number;
  isRelated: boolean;
  isSelected: boolean;
  isEditable: boolean;
  isWrongValue: boolean;
  isHighlighted: boolean;
  isHighlightWrong: boolean;
  showHelper: boolean;
  showInputHelper: boolean;
  isGameComplete: boolean;

  constructor(
    private sudokuService: SudokuService,
    private gameService: GameService ) {
  }

  ngOnInit() {
    this.options = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.x = this.i;
    this.y = this.j;
    this.sudokuService.addCell(this);
    this.num = 0;
    this.gameService.getShowHelperListener().subscribe(flag => this.showInputHelper = flag );
    this.gameService.getGameCompleteFlag().subscribe(flag => this.isGameComplete = flag );
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
    for (let i = 0;  i < allCells.length; i++) {
      for (let j = 0; j < allCells[i].length; j++) {
        if (!allCells[i][j].isSelected) {
          allCells[i][j].showHelper = false;
        }
      }
    }
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
    this.sudokuService.highlightSameNumber(this);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.isEditable && event.key > '0' && event.key <= '9') {
      const enteredNumber = parseInt( event.key, 10 );
      this.sudokuService.inputNumber( enteredNumber );
      // this.isWrongValue = !this.sudokuService.isSafeNumber(this.x, this.y, enteredNumber);
      this.num = enteredNumber;
      this.sudokuService.highlightSameNumber(this);
      this.options.push(enteredNumber);
    }
  }

  onBackspaceKeydown($event) {
    if (this.isEditable) {
      this.num = 0;
      this.isWrongValue = false;
      this.sudokuService.highlightSameNumber(this);
    }
  }

  onKeyUp($event: KeyboardEvent) {
    console.log( '-----------> CELL: Sending message to Grid --->' );
    this.gameService.updateGameStateChange($event.key);
    this.sudokuService.updteGameCompleteFlag();
    this.sudokuService.fillUpdateHelper();
  }
}
