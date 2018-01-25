import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGameDialogComponent } from './import-game-dialog.component';

describe('ImportGameDialogComponent', () => {
  let component: ImportGameDialogComponent;
  let fixture: ComponentFixture<ImportGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
