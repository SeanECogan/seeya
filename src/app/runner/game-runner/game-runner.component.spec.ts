import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRunnerComponent } from './game-runner.component';

describe('GameRunnerComponent', () => {
  let component: GameRunnerComponent;
  let fixture: ComponentFixture<GameRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
