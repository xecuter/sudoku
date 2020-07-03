import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuGridComponent } from './components/sudoku-grid/sudoku-grid.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { DesktopComponent } from './components/desktop/desktop.component';


@NgModule({
  declarations: [
    AppComponent,
    SudokuGridComponent,
    GridCellComponent,
    GameComponent,
    DesktopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: DesktopComponent},
      {path: 'game/:diffLevel', component: GameComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
