import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html'
})
export class SudokuGridComponent implements OnInit {
  N;
  @Output() isGameCompeted: EventEmitter<any> = new EventEmitter<any>();
  @Output() gameStateChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private sudokuService: SudokuService) {
  }

  ngOnInit() {
    this.N = this.sudokuService.N;
  }

  checkIfComplete() {
    this.isGameCompeted.emit( this.sudokuService.checkIfCompleted() );
  }
}
