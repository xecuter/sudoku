import { Component, OnInit } from '@angular/core';
import {CellRowComponent} from '../cell-row/cell-row.component';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html'
})
export class BoxComponent implements OnInit {
  cellRows: CellRowComponent[] = [new CellRowComponent(), new CellRowComponent(), new CellRowComponent()];

  constructor() { }

  ngOnInit() {
  }

}
