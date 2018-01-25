import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerModule } from '../runner.module';

import { ImportGameComponent } from './import-game.component';

describe('ImportGameComponent', () => {
  let component: ImportGameComponent;
  let fixture: ComponentFixture<ImportGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RunnerModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
