import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SudokuService} from '../../services/sudoku.service';
import {ConfirmationDialogComponent, DialogData} from '../confirmation-dialog/confirmation-dialog.component';
import {faHome, faPencilRuler, faPen} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {GameService} from '../../services/game.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  difficultyLevel: string;
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
    private gameService: GameService,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.faHome = faHome;
    this.faEdit = faEdit;
    this.faPencilRuler = faPencilRuler;
    this.faPen = faPen;
    this.toggleShowHelpFlag = false;

    this.gameService.getGameCompleteFlag().subscribe(flag => {
      console.log('--------------> is Game Completed: --> ' + flag);
      this.isGameCompleted = flag;
    });
    this.gameService.getGameStateChange().subscribe(str => {
      console.log('--------------> Game State Change: --> ' + str);
      for (let i = 0; i < 9; i++) {
        this.numberUsed[i] = this.sudokuService.numberUsed(i + 1);
      }
      this.sudokuService.sageGameState();
    });

    this.activeRoute.paramMap
      .subscribe(params => {
        console.log(params.get('diffLevel'));
        this.difficultyLevel = params.get('diffLevel');
      });
    this.numberUsed = [];
    for (let i = 0; i < 9; i++) {
      this.numberUsed[i] = 0;
    }
  }

  ngAfterViewInit() {
    setTimeout(_ => {
      this.sudokuService.initSudoku(this.difficultyLevel);
      this.gameService.updateGameStateChange('0');
    }, 500);
  }

  endGameOpenDlg() {
    let endCurrentGame = false;
    if ( !this.isGameCompleted ) {
      const dlgData = new DialogData('End Current Game', 'Do you really want to End the current Game? You will be resume this game later on.');
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
