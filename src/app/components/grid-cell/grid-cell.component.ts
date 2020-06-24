import {Component, Input, OnInit} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html'
})
export class GridCellComponent implements OnInit {
  @Input() i;
  @Input() j;
  x: number;
  y: number;
  num: any;
  isSelected: boolean;
  isEditable: boolean;

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
      }
    }
    this.isSelected = true;
  }

}
