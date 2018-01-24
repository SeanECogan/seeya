import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportGameComponent } from './export-game.component';

describe('ExportGameComponent', () => {
  let component: ExportGameComponent;
  let fixture: ComponentFixture<ExportGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
