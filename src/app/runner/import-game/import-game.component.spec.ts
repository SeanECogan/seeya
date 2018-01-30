import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RunnerModule } from '../runner.module';

import { SceneService } from '../scene/scene.service';

import { ImportGameComponent } from './import-game.component';
import { SceneModel } from '../../shared/models/scene-model';

describe('ImportGameComponent', () => {
  let component: ImportGameComponent;
  let fixture: ComponentFixture<ImportGameComponent>;
  let fakeSceneService: SceneService;
  let importGameButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RunnerModule ],
      providers: [ { provide: SceneService, useValue: {
        gameIsFinished: () => false,
        getCurrentScene: () => new SceneModel(1, 'Test', 'Test', null)
      } } ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGameComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    importGameButton = fixture.debugElement.query(By.css('#import-game-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the import button while the game is finished and is loaded', () => {
    fakeSceneService.gameIsFinished = () => true;
    fakeSceneService.getCurrentScene = () => new SceneModel(1, 'Test', 'Test', null);

    fixture.detectChanges();

    importGameButton = fixture.debugElement.query(By.css('#import-game-button'));

    expect(importGameButton).toBeTruthy();
  });

  it('should show the import button while the game is finished and not loaded', () => {    
    fakeSceneService.gameIsFinished = () => true;
    fakeSceneService.getCurrentScene = () => null;

    fixture.detectChanges();

    importGameButton = fixture.debugElement.query(By.css('#import-game-button'));

    expect(importGameButton).toBeTruthy();
  });

  it('should show the import button while the game is not finished and not loaded', () => {    
    fakeSceneService.gameIsFinished = () => false;
    fakeSceneService.getCurrentScene = () => null;

    fixture.detectChanges();

    importGameButton = fixture.debugElement.query(By.css('#import-game-button'));

    expect(importGameButton).toBeTruthy();
  });

  it('should not show the import button while the game is not finished and is loaded', () => {
    fakeSceneService.gameIsFinished = () => false;
    fakeSceneService.getCurrentScene = () => new SceneModel(1, 'Test', 'Test', null);

    fixture.detectChanges();

    importGameButton = fixture.debugElement.query(By.css('#import-game-button'));

    expect(importGameButton).toBeFalsy();
  });
});
