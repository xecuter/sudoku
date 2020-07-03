import { Component, OnInit } from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  constructor(private sudokuService: SudokuService) { }

  ngOnInit() {
  }
  initSudokuBtn() {
    this.sudokuService.initSudoku();
  }

}
