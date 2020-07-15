import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-grid-cell-input',
  templateUrl: './grid-cell-input.component.html',
  styleUrls: ['./grid-cell-input.component.css']
})
export class GridCellInputComponent implements OnInit {
  @Input() numberUsed: number[];

  widthHeight: number;
  halfWidthHeight: number;
  radius: number;
  circumference: number;
  viewBox: string;


  constructor(
    private sudokuService: SudokuService,
    private gameService: GameService) { }

  ngOnInit() {
    this.widthHeight = 50;
    this.halfWidthHeight = this.widthHeight / 2;
    this.viewBox = '0 0 ' + this.halfWidthHeight + ' ' + this.halfWidthHeight;
    this.radius = 22.5;

    this.circumference = 2 * Math.PI * this.radius;
  }

  clickNumberInput(inputNumber: number) {
    if ( inputNumber === 0 || this.numberUsed[inputNumber - 1] < 9 ) {
      this.sudokuService.inputNumber( inputNumber );
      this.gameService.updateGameStateChange( inputNumber.toString() );
      this.sudokuService.updteGameCompleteFlag();
      this.sudokuService.fillUpdateHelper();
    }
  }
}
