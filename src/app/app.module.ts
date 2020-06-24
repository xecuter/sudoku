import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuGridComponent } from './components/sudoku-grid/sudoku-grid.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';


@NgModule({
  declarations: [
    AppComponent,
    SudokuGridComponent,
    GridCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
