import {Component, Input, OnInit} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  title = 'sudoku';

  constructor(private sudokuService: SudokuService) { }

  ngOnInit() {
  }


}
