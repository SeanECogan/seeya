import { Injectable } from '@angular/core';

import { GameFactory } from '../../shared/factories/game-factory';
import { SceneFactory } from '../../shared/factories/scene-factory';
import { LinkFactory } from '../../shared/factories/link-factory';

import { SceneModel } from '../../shared/models/scene-model';

@Injectable()
export class SceneService {

  constructor() {
    this.gf = new GameFactory();
    this.sf = new SceneFactory();
    this.lf = new LinkFactory();

    this.scenes = new Array<SceneModel>();
  }

  getScenes(): SceneModel[] {
    return this.scenes;
  }

  getNumberOfScenes(): number {
    return this.scenes.length;
  }

  addScene(
    header: string,
    description: string
  ): void {
    let currentLatestIndex = -1;
    let fromSceneId = -1;

    // Only check this if it is not the first scene.
    if (this.scenes.length > 0) {
      // Get the index of the latest scene.
      currentLatestIndex = this.scenes.length - 1;

      fromSceneId = this.scenes[currentLatestIndex].id;
    }

    // Add new scene.
    this.scenes.push(
      this.sf.createSceneWithoutLink(
        header,
        description
      )
    );

    // Only check this if it is not the first scene.
    if (this.scenes.length > 1) {
      // Get the index of the new latest scene.
      let newLatestIndex = this.scenes.length - 1;

      let toSceneId = this.scenes[newLatestIndex].id;

      // Create new Link between these scenes.
      let link = this.lf.createLink(
        fromSceneId,
        toSceneId
      );

      // Update previously last scene with link to new last scene.
      this.scenes[currentLatestIndex] = this.sf.createSceneWithLink(
        this.scenes[currentLatestIndex],
        link
      );
    }
  }

  exportGame(): string {
    let game = this.gf.createGame(this.scenes);

    let gameJsonString = JSON.stringify(game);

    return btoa(gameJsonString);
  }

  private gf: GameFactory;
  private sf: SceneFactory;
  private lf: LinkFactory;

  private scenes: SceneModel[]
}
