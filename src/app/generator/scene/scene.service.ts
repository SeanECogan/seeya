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

  editScene(
    sceneId: number,
    header: string,
    description: string
  ) {
    const sceneToEdit = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToEdit) {
      sceneToEdit.header = header;
      sceneToEdit.description = description;
    }
  }

  deleteScene(sceneId: number): void {
    const sceneToDelete = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToDelete) {
      // Check to see if we must update the previous Scene that was connected to
      // this one.
      const sceneToUpdate = this.scenes.filter(scene => {
        return scene.link !== null &&
          scene.link.toSceneId === sceneToDelete.id;
      })[0];

      if (sceneToUpdate) {
        if (sceneToDelete.link !== null) {
          // If this Scene was linked to another Scene, the Scene that is linked to
          // this Scene should now be linked to that one.
          sceneToUpdate.link.toSceneId = sceneToDelete.link.toSceneId;
          sceneToUpdate.link.displayText = sceneToDelete.link.displayText;
        } else {
          // Otherwise, the Scene that was linked to this Scene should no longer be
          // linked to any Scene.
          sceneToUpdate.link = null;
        }
      }

      const sceneToDeleteIndex = this.scenes.indexOf(sceneToDelete);

      this.scenes.splice(sceneToDeleteIndex, 1);
    }
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
