import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellHelperComponent } from './grid-cell-helper.component';

describe('GridCellHelperComponent', () => {
  let component: GridCellHelperComponent;
  let fixture: ComponentFixture<GridCellHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCellHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCellHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
