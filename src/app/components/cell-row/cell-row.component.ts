import { Component, OnInit } from '@angular/core';
import {CellComponent} from '../cell/cell.component';

@Component({
  selector: 'app-cell-row',
  templateUrl: './cell-row.component.html'
})
export class CellRowComponent implements OnInit {
  cells: CellComponent[] = [new CellComponent(), new CellComponent(), new CellComponent()];

  constructor() { }

  ngOnInit() {
  }

}
