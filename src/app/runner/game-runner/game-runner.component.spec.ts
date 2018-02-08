import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RunnerModule } from '../runner.module';

import { SceneService } from '../../runner/scene/scene.service';

import { GameRunnerComponent } from './game-runner.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

describe('GameRunnerComponent', () => {
  let component: GameRunnerComponent;
  let fixture: ComponentFixture<GameRunnerComponent>;
  let fakeSceneService: SceneService;
  let gameContainer: DebugElement;
  let nextSceneButtons: DebugElement[];
  let playAgainButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RunnerModule ],
      providers: [{ provide: SceneService, useValue: {
        getCurrentScene: () => null
      } }],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRunnerComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    gameContainer = fixture.debugElement.query(By.css('#game-container'));
    nextSceneButtons = fixture.debugElement.queryAll(By.css('.next-scene-button'));
    playAgainButton = fixture.debugElement.query(By.css('#play-again-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the game container if the current scene is null', () => {
    fakeSceneService.getCurrentScene = () => null;

    fixture.detectChanges();

    gameContainer = fixture.debugElement.query(By.css('#game-container'));

    expect(gameContainer).toBeNull();
  });

  it('should have a null current scene if the service returns null', () => {
    fakeSceneService.getCurrentScene = () => null;

    fixture.detectChanges();

    expect(component.currentScene).toBeNull();
  });

  it('should not have any buttons if the service returns null', () => {
    fakeSceneService.getCurrentScene = () => null;

    fixture.detectChanges();

    expect(nextSceneButtons.length).toBe(0);
    expect(playAgainButton).toBeNull();
  });

  it('should display the game container if the current scene is not null', () => {
    fakeSceneService.getCurrentScene = () => {
      return new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>());
    };

    fixture.detectChanges();

    gameContainer = fixture.debugElement.query(By.css('#game-container'));

    expect(gameContainer).toBeTruthy();
  });

  it('should have a current scene if the service returns a current scene', () => {
    fakeSceneService.getCurrentScene = () => {
      return new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>());
    };

    fixture.detectChanges();

    expect(component.currentScene).toBeTruthy();
  });

  it('should have a play again button if the scene has no linked scene', () => {
    fakeSceneService.getCurrentScene = () => {
      return new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>());
    };

    fixture.detectChanges();

    // Must re-query for the playAgainButton because it didn't exist by default.
    playAgainButton = fixture.debugElement.query(By.css('#play-again-button'));

    expect(playAgainButton).toBeTruthy();
  });

  it('should have a next scene button if the scene has a linked scene', () => {
    fakeSceneService.getCurrentScene = () => {
      return new SceneModel(
        1,
        'Test',
        'Test',
        '',
        [ new LinkModel(1, 2, 'Display') ]);
    };

    fixture.detectChanges();

    nextSceneButtons = fixture.debugElement.queryAll(By.css('.next-scene-button'));

    expect(nextSceneButtons.length).toBe(1);
    expect(nextSceneButtons[0].nativeElement.innerText).toBe('Display');
  });

  it('should load the next scene if the next scene button is clicked', () => {
    // We actually want this to work like the real scene service now.
    const tempSceneService = new SceneService();

    fakeSceneService.importGame = tempSceneService.importGame;
    fakeSceneService.startGame = tempSceneService.startGame;
    fakeSceneService.getCurrentScene = tempSceneService.getCurrentScene;
    fakeSceneService.loadNextScene = tempSceneService.loadNextScene;

    fakeSceneService['initialSceneId'] = 5;
    fakeSceneService['scenes'] = [
      new SceneModel(
        5,
        'Header',
        'Description',
        '',
        [
          new LinkModel(5, 6, 'Test')
        ]
      ),
      new SceneModel(
        6,
        'Header2',
        'Description2',
        '',
        new Array<LinkModel>()
      )
    ];

    // Start the game.
    fakeSceneService.startGame();

    // First scene should be 5/Header/Description/Link to 6.
    const firstScene = component.currentScene;

    fixture.detectChanges();

    // Must re-query for the nextSceneButton because it didn't exist by default.
    nextSceneButtons = fixture.debugElement.queryAll(By.css('.next-scene-button'));

    nextSceneButtons[0].triggerEventHandler('click', null);

    // Next scene should be 6/Header2/Description2/null.
    const nextScene = component.currentScene;

    expect(nextScene.id).toBe(6);
    expect(nextScene.header).toBe('Header2');
    expect(nextScene.description).toBe('Description2');
  });

  it('should re-load the first scene if the next scene button is clicked', () => {
    // We actually want this to work like the real scene service now.
    const tempSceneService = new SceneService();

    fakeSceneService.importGame = tempSceneService.importGame;
    fakeSceneService.startGame = tempSceneService.startGame;
    fakeSceneService.getCurrentScene = tempSceneService.getCurrentScene;
    fakeSceneService.loadNextScene = tempSceneService.loadNextScene;

    fakeSceneService['initialSceneId'] = 5;
    fakeSceneService['scenes'] = [
      new SceneModel(
        5,
        'Header',
        'Description',
        '',
        [
          new LinkModel(5, 6, 'Test')
        ]
      ),
      new SceneModel(
        6,
        'Header2',
        'Description2',
        '',
        new Array<LinkModel>()
      )
    ];

    // Start the game.
    fakeSceneService.startGame();

    fixture.detectChanges();

    // Must re-query for the nextSceneButton because it didn't exist by default.
    nextSceneButtons = fixture.debugElement.queryAll(By.css('.next-scene-button'));

    nextSceneButtons[0].triggerEventHandler('click', null);

    fixture.detectChanges();

    // Now we can get the Play Again button.
    playAgainButton = fixture.debugElement.query(By.css('#play-again-button'));

    playAgainButton.triggerEventHandler('click', null);

    // This should be the first scene now: 5/Header/Description/Link to 6.
    const currentScene = component.currentScene;

    expect(currentScene.id).toBe(5);
    expect(currentScene.header).toBe('Header');
    expect(currentScene.description).toBe('Description');
  });
});
