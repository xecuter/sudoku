import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { BoxRowComponent } from './components/box-row/box-row.component';
import { BoxComponent } from './components/box/box.component';
import { CellRowComponent } from './components/cell-row/cell-row.component';


@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoxRowComponent,
    BoxComponent,
    CellRowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
