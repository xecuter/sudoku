import { Component, OnInit } from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html'
})
export class SudokuGridComponent implements OnInit {
  N;

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit() {
    this.N = this.sudokuService.N;
  }

}
