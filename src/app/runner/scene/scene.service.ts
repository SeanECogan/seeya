import { Injectable } from '@angular/core';
import { SceneModel } from '../../shared/models/scene-model';
import { GameModel } from '../../shared/models/game-model';

@Injectable()
export class SceneService {
  private initialSceneId: number;
  private scenes: SceneModel[];
  private currentScene: SceneModel;

  constructor() {
    this.initialSceneId = -1;
    this.scenes = new Array<SceneModel>();
    this.currentScene = null;
  }

  importGame(
    gameImportString: string
  ): void {
    const gameString = this.b64DecodeWithUnicode(gameImportString);

    const game = JSON.parse(gameString) as GameModel;

    this.initialSceneId = game.initialSceneId;
    this.scenes = game.scenes;
  }

  startGame(): void {
    if (this.scenes.length > 0) {
      this.currentScene =
        this.scenes.filter(scene => scene.id === this.initialSceneId)[0];
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
        this.scenes.filter(scene => scene.id === toSceneId)[0];
    }
  }

  gameIsFinished(): boolean {
    return this.currentScene !== null && this.currentScene.links.length === 0;
  }

  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551
  private b64DecodeWithUnicode(str): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
