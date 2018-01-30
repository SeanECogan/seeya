import { Injectable } from '@angular/core';
import { SceneModel } from '../../shared/models/scene-model';
import { GameModel } from '../../shared/models/game-model';

@Injectable()
export class SceneService {

  constructor() { 
    this.initialSceneId = -1;
    this.scenes = new Array<SceneModel>();
    this.currentScene = null;
  }

  importGame(
    gameImportString: string
  ): void {
    let gameString = atob(gameImportString);

    let game = JSON.parse(gameString) as GameModel;

    this.initialSceneId = game.initialSceneId;
    this.scenes = game.scenes;
  }

  startGame(): void {
    if (this.scenes.length > 0) {
      this.currentScene = 
        this.scenes.filter(scene => scene.id == this.initialSceneId)[0];
    }
  }

  getCurrentScene(): SceneModel {
    return this.currentScene;
  }

  getNumberOfScenes(): number {
    return this.scenes.length;
  }

  loadNextScene(toSceneId: number): void {
    if (this.scenes.length > 0) {
      this.currentScene = 
        this.scenes.filter(scene => scene.id == toSceneId)[0];
    }
  }

  gameIsFinished(): boolean {
    return this.currentScene != null && this.currentScene.link === null;
  }

  private initialSceneId: number;
  private scenes: SceneModel[];
  private currentScene: SceneModel;
}
