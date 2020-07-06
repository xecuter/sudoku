import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SudokuService} from '../../services/sudoku.service';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  difficultyLevel: number;
  isGameCompleted: boolean;
  numberUsed: number[];

  constructor(private route: ActivatedRoute, private sudokuService: SudokuService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        console.log(params.get('diffLevel'));
        this.difficultyLevel = parseInt(params.get('diffLevel'), 10);
      });
    this.numberUsed = [];
    for (let i = 0; i < 9; i++) {
      this.numberUsed[i] = 0;
    }
  }

  ngAfterViewInit() {
    setTimeout(_ => {
      this.sudokuService.initSudoku(this.difficultyLevel);
    }, 500);
  }

  isGameCompeted(isGameCompletedFlag: boolean) {
    console.log('--------------> is Game Completed --> ' + isGameCompletedFlag);
    this.isGameCompleted = isGameCompletedFlag;
  }

  gameStateChanged() {

  }

  endGameOpenDlg() {
    let endCurrentGame = false;
    if ( !this.isGameCompleted ) {
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
