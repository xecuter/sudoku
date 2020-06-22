import { Component } from '@angular/core';
import {BoxRowComponent} from './components/box-row/box-row.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudoku';
  boxRows: BoxRowComponent[] = [new BoxRowComponent(), new BoxRowComponent(), new BoxRowComponent()];


  /*cells: string[] = ['cell-1', 'cell-2', 'cell-3'];
  cell_row: string[][] = [this.cells, this.cells, this.cells];
  box: string[][][] = [this.cell_row, this.cell_row, this.cell_row];*/

}
