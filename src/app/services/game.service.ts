import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SudokuService} from './sudoku.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameStateChange = new Subject<string>();
  private numberInputListener = new Subject<number>();
  private showHelperListener = new Subject<boolean>();
  private gameCompleteFlag = new Subject<boolean>();

  constructor() {}

  getGameStateChange(): Observable<string> {
    return this.gameStateChange.asObservable();
  }

  updateGameStateChange(msg: string) {
    this.gameStateChange.next(msg);
  }

  getNumberInputListener(): Observable<number> {
    return this.numberInputListener.asObservable();
  }

  updateNumber(number: number) {
    this.numberInputListener.next(number);
  }

  getShowHelperListener(): Observable<boolean> {
    return this.showHelperListener.asObservable();
  }

  updateShowHelperListener(showHelper: boolean) {
    this.showHelperListener.next(showHelper);
  }

  getGameCompleteFlag(): Observable<boolean> {
    return this.gameCompleteFlag.asObservable();
  }

  updateGameCompleteFlag(flag: boolean) {
    this.gameCompleteFlag.next(flag);
  }
}
