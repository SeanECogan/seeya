import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportGameDialogComponent } from './export-game-dialog.component';

describe('ExportGameDialogComponent', () => {
  let component: ExportGameDialogComponent;
  let fixture: ComponentFixture<ExportGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
