import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SudokuService} from '../../services/sudoku.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  difficultyLevel: number;

  constructor(private route: ActivatedRoute, private sudokuService: SudokuService ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        console.log(params.get('diffLevel'));
        this.difficultyLevel = parseInt(params.get('diffLevel'), 10);
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => {
      this.sudokuService.initSudoku(this.difficultyLevel);
    }, 500);
  }

}
