import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SudokuService} from '../../services/sudoku.service';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';
import {faHome, faPencilAlt, faPencilRuler, faPen} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faBuromobelexperte} from '@fortawesome/free-brands-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {GameServiceService} from '../../services/game-service.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  difficultyLevel: number;
  isGameCompleted: boolean;
  toggleShowHelpFlag: boolean;
  numberUsed: number[];
  faHome: IconDefinition;
  faEdit: IconDefinition;
  faPencilRuler: IconDefinition;
  faPen: IconDefinition;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private sudokuService: SudokuService,
    private gameService: GameServiceService,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.faHome = faHome;
    this.faEdit = faEdit;
    this.faPencilRuler = faPencilRuler;
    this.faPen = faPen;
    this.toggleShowHelpFlag = false;

    this.activeRoute.paramMap
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
      this.gameStateChanged(0 );
    }, 500);
  }

  isGameCompeted(isGameCompletedFlag: boolean) {
    this.isGameCompleted = isGameCompletedFlag;
  }

  gameStateChanged(numberInput: number) {
    console.log('--------------> is Game Completed --> ' + numberInput);
    for (let i = 0; i < 9; i++) {
      this.numberUsed[i] = this.sudokuService.numberUsed(i + 1);
    }
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
          this.route.navigate(['/']);
        }
      });
    } else {
      this.route.navigate(['/']);
    }
  }

  toggleShowHelp() {
    this.toggleShowHelpFlag = !this.toggleShowHelpFlag;
    this.gameService.updateShowHelperListener(this.toggleShowHelpFlag);
  }
}
