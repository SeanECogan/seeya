import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorModule } from '../generator.module';

import { ExportGameComponent } from './export-game.component';

describe('ExportGameComponent', () => {
  let component: ExportGameComponent;
  let fixture: ComponentFixture<ExportGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
