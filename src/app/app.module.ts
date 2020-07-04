import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuGridComponent } from './components/sudoku-grid/sudoku-grid.component';
import { GridCellComponent } from './components/grid-cell/grid-cell.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GridCellHelperComponent } from './components/grid-cell-helper/grid-cell-helper.component';
import { GridCellInputComponent } from './components/grid-cell-input/grid-cell-input.component';
import { LongPressDirective } from './directives/long-press.directive';


@NgModule({
  declarations: [
    AppComponent,
    SudokuGridComponent,
    GridCellComponent,
    GameComponent,
    DesktopComponent,
    ConfirmationDialogComponent,
    GridCellHelperComponent,
    GridCellInputComponent,
    LongPressDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: DesktopComponent},
      {path: 'game/:diffLevel', component: GameComponent}
    ]),
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
