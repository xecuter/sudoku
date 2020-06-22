import { Component, OnInit } from '@angular/core';
import {BoxComponent} from '../box/box.component';

@Component({
  selector: 'app-box-row',
  templateUrl: './box-row.component.html'
})
export class BoxRowComponent implements OnInit {
  boxes: BoxComponent[] = [new BoxComponent(), new BoxComponent(), new BoxComponent()];

  constructor() { }

  ngOnInit() {
  }

}
