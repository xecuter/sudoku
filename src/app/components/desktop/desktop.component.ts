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
  isSavedGameAvailable: boolean;
  lastLink: string;

  constructor(
    private route: Router,
    private sudokuService: SudokuService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.isSavedGameAvailable = this.sudokuService.isGameAvailable();
    const diffLevel = this.sudokuService.getLastSavedDiffLevel();
    if ( this.isSavedGameAvailable && diffLevel != null && diffLevel.length > 0 ) {
      console.log( 'DIFF LEVEL ----> ' + diffLevel);
      this.lastLink = diffLevel;
    }
  }

  startNewGameDlg(diffLevel) {
    if ( this.isSavedGameAvailable ) {
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

  loadLastGame() {
    this.route.navigate( ['/game/' + this.lastLink] );
  }
}
