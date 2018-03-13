import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GameFactory } from '../../shared/factories/game-factory';
import { SceneFactory } from '../../shared/factories/scene-factory';
import { LinkFactory } from '../../shared/factories/link-factory';

import { GameModel } from '../../shared/models/game-model';
import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagModel } from '../../shared/models/flag-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';

@Injectable()
export class SceneService {
  private gf: GameFactory;
  private sf: SceneFactory;
  private lf: LinkFactory;

  private initialSceneId: number;
  private scenes: SceneModel[];

  constructor() {
    this.gf = new GameFactory();
    this.sf = new SceneFactory();
    this.lf = new LinkFactory();

    this.initialSceneId = -1;
    this.scenes = new Array<SceneModel>();
  }

  getInitialSceneId(): number {
    return this.initialSceneId;
  }

  setInitialSceneId(newInitialSceneId: number): void {
    this.initialSceneId = newInitialSceneId;
  }

  getScenes(): SceneModel[] {
    return this.scenes;
  }

  getNumberOfScenes(): number {
    return this.scenes.length;
  }

  getNextSceneId(): number {
    // Find next Scene ID.
    let currentMax = 0;

    if (this.scenes.length > 0) {
      currentMax = Math.max(...(this.scenes.map(scene => scene.id)));
    }

    return currentMax + 1;
  }

  addScene(
    id: number,
    header: string,
    description: string,
    imageUrl: string,
    links: LinkModel[],
    flags: FlagModel[]
  ): void {
    this.addNewScene(
      id,
      header,
      description,
      imageUrl,
      links,
    flags);

    // Initialize the Initial Scene ID if one isn't set yet.
    if (this.initialSceneId < 0) {
      this.initialSceneId = Math.min(...this.scenes.map(s => s.id));
    }
  }

  editScene(
    sceneId: number,
    header: string,
    description: string,
    imageUrl: string,
    links: LinkModel[],
    flags: FlagModel[]
  ): void {
    const sceneToEdit = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToEdit) {
      sceneToEdit.header = header;
      sceneToEdit.description = description;
      sceneToEdit.imageUrl = imageUrl;
      sceneToEdit.links = links;
      sceneToEdit.flags = flags;
    }
  }

  deleteScene(sceneId: number): void {
    const sceneToDelete = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToDelete) {
      // Remove any Links that previously linked to this scene.
      const scenesToUpdate = this.scenes.filter(scene => {
        return scene.links.some(link => {
          return link.toSceneId === sceneToDelete.id;
        });
      });

      for (const sceneToUpdate of scenesToUpdate) {
        sceneToUpdate.links = sceneToUpdate.links.filter(link => {
          return link.toSceneId !== sceneToDelete.id;
        });
      }

      const sceneToDeleteIndex = this.scenes.indexOf(sceneToDelete);

      this.scenes.splice(sceneToDeleteIndex, 1);
    }
  }

  getNextFlagId(): number {
    let currentMax = 0;

    if (this.scenes.length > 0) {
      const allFlags = this.getAllFlags();

      currentMax = Math.max(...allFlags.map(flag => flag.id));
    }

    return currentMax + 1;
  }

  getAllFlags(): FlagModel[] {
    const allFlags = new Array<FlagModel>();

    this.scenes.map(scene => {
      scene.flags.map(flag => {
        allFlags.push(flag);
      });
    });

    return allFlags;
  }

  getFlag(
    flagId: number,
    sceneId: number
  ): FlagModel {
    let flag = null;

    const flagScene = this.scenes.filter(scene => {
      return scene.id === sceneId;
    })[0];

    if (flagScene !== null &&
        flagScene !== undefined) {
      flag = flagScene.flags.filter(sceneFlag => {
        return sceneFlag.id === flagId;
      })[0];
    }

    return flag;
  }

  exportGame(): string {
    const game = this.gf.createGame(
      this.initialSceneId,
      this.scenes);
    const gameJsonString = JSON.stringify(game);

    return this.b64EncodeWithUnicode(gameJsonString);
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

  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551
  private b64EncodeWithUnicode(str): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  private b64DecodeWithUnicode(str): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private addNewScene(
    id: number,
    header: string,
    description: string,
    imageUrl: string,
    links: LinkModel[],
    flags: FlagModel[]
  ): void {
    this.scenes.push(
      this.sf.createScene(
        id,
        header,
        description,
        imageUrl,
        links,
        flags
      )
    );
  }
}
