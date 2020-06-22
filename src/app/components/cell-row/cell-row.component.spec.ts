import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRowComponent } from './cell-row.component';

describe('CellRowComponent', () => {
  let component: CellRowComponent;
  let fixture: ComponentFixture<CellRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
