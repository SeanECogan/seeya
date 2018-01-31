import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GameFactory } from '../../shared/factories/game-factory';
import { SceneFactory } from '../../shared/factories/scene-factory';
import { LinkFactory } from '../../shared/factories/link-factory';

import { SceneModel } from '../../shared/models/scene-model';
import { GameModel } from '../../shared/models/game-model';

@Injectable()
export class SceneService {
  private gf: GameFactory;
  private sf: SceneFactory;
  private lf: LinkFactory;

  private scenes: SceneModel[];

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
    this.addNewScene(header, description);
  }

  addSceneWithLink(
    header: string,
    description: string,
    linkDisplayText: string
  ) {
    // Get the index of the latest scene.
    const currentLatestIndex = this.scenes.length - 1;

    const fromSceneId = this.scenes[currentLatestIndex].id;

    this.addNewScene(header, description);

    // Get the index of the new latest scene.
    const newLatestIndex = this.scenes.length - 1;

    const toSceneId = this.scenes[newLatestIndex].id;

    // Create new Link between these scenes.
    const link = this.lf.createLink(
      fromSceneId,
      toSceneId,
      linkDisplayText
    );

    // Update previously last scene with link to new last scene.
    this.scenes[currentLatestIndex] = this.sf.createSceneWithLink(
      this.scenes[currentLatestIndex],
      link
    );
  }

  exportGame(): string {
    const game = this.gf.createGame(this.scenes);

    const gameJsonString = JSON.stringify(game);

    return btoa(gameJsonString);
  }

  importGame(
    gameImportString: string
  ): void {
    const gameString = atob(gameImportString);

    const game = JSON.parse(gameString) as GameModel;

    this.scenes = game.scenes;
  }

  private addNewScene(
    header: string,
    description: string
  ): void {
    this.scenes.push(
      this.sf.createSceneWithoutLink(
        header,
        description
      )
    );
  }
}
