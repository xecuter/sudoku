import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellInputComponent } from './grid-cell-input.component';

describe('GridCellInputComponent', () => {
  let component: GridCellInputComponent;
  let fixture: ComponentFixture<GridCellInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
