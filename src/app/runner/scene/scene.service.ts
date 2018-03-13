import { Injectable } from '@angular/core';
import { SceneModel } from '../../shared/models/scene-model';
import { GameModel } from '../../shared/models/game-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagModel } from '../../shared/models/flag-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';

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

    this.scenes.map(scene => {
      if (!scene.links) {
        scene.links = new Array<LinkModel>();
      } else {
        scene.links.map(link => {
          if (!link.flagReferences) {
            link.flagReferences = new Array<FlagReferenceModel>();
          }
        });
      }

      if (!scene.flags) {
        scene.flags = new Array<FlagModel>();
      }
    });
  }

  startGame(): void {
    if (this.scenes.length > 0) {
      this.scenes.map(scene => {
        this.toggleFlagsForScene(
          scene.id,
          false
        );
      });

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

  setFlagsForScene(sceneId: number): void {
    this.toggleFlagsForScene(
      sceneId,
      true
    );
  }

  allFlagsSetForLink(link: LinkModel): boolean {
    let allFlagsSet = true;

    link.flagReferences.map(flagReference => {
      const flagScene: SceneModel = this.scenes.filter(scene => {
        return scene.id === flagReference.sceneId;
      })[0];

      if (flagScene) {
        const linkFlag: FlagModel = flagScene.flags.filter(flag => {
          return flag.id === flagReference.id;
        })[0];

        if (linkFlag) {
          if (!linkFlag.isSet) {
            allFlagsSet = false;
          }
        } else {
          allFlagsSet = false;
        }
      } else {
        allFlagsSet = false;
      }
    });

    return allFlagsSet;
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

  private toggleFlagsForScene(
    sceneId: number,
    value: boolean): void {
    if (this.scenes.length > 0) {
      const sceneToUpdate = this.scenes.filter(scene => {
        return scene.id === sceneId;
      })[0];

      if (sceneToUpdate) {
        const sceneIndexToUpdate = this.scenes.indexOf(sceneToUpdate);

        sceneToUpdate.flags.map(flag => {
          flag.isSet = value;
        });

        this.scenes[sceneIndexToUpdate] = sceneToUpdate;
      }
    }
  }
}
