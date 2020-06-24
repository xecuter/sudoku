import {Component, OnInit} from '@angular/core';
import {SudokuService} from './services/sudoku.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sudoku';

  constructor(private sudoku: SudokuService) {
  }

  ngOnInit(): void {
  }

  initSudokuBtn() {
    console.log( this.sudoku.cells );
    this.sudoku.initSudoku();
  }

}
