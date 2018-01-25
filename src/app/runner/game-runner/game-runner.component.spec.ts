import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerModule } from '../runner.module';

import { GameRunnerComponent } from './game-runner.component';

describe('GameRunnerComponent', () => {
  let component: GameRunnerComponent;
  let fixture: ComponentFixture<GameRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RunnerModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRunnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
