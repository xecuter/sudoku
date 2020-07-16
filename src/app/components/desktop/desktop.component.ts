import {Component, Input, OnInit} from '@angular/core';
import {SudokuService} from '../../services/sudoku.service';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  title = 'sudoku';
  isSavedGameAvaialble: boolean;

  constructor(
    private route: Router,
    private sudokuService: SudokuService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.isSavedGameAvaialble = this.sudokuService.isGameAvailable();
  }

  startNewGameDlg(diffLevel) {
    if ( this.isSavedGameAvaialble ) {
      const dlgData = new DialogData('Start New Game', 'Do you want to start new game and discard the saved game?');
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: dlgData
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          this.sudokuService.discardSavedGame();
          this.route.navigate([diffLevel]);
        }
      });
    } else {
      this.route.navigate([diffLevel]);
    }
  }

}
