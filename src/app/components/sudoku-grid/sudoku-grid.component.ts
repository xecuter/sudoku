import { Component, OnInit } from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html'
})
export class SudokuGridComponent implements OnInit {
  N;
  isGameCompeted: boolean;

  constructor(private sudokuService: SudokuService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.N = this.sudokuService.N;
  }

  checkIfComplete() {
    this.isGameCompeted = this.sudokuService.checkIfCompleted();
  }

  endGameOpenDlg() {
    let endCurrentGame = false;
    if ( !this.isGameCompeted ) {
      const dlgData = new DialogData('End Current Game', 'Do you really want to End the current Game?');
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: dlgData
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        endCurrentGame = result;

        if (endCurrentGame) {

        }
      });
    }

  }
}
