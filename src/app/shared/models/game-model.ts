import { SceneModel } from './scene-model';

export class GameModel {
  /**
   * Generates a GameModel object, which houses the adventure-level information
   * for the entire game.
   */
  constructor(
    initialSceneId: number,
    scenes: SceneModel[]
  ) {
    this.initialSceneId = initialSceneId;
    this.scenes = scenes;
  }

  initialSceneId: number;
  scenes: SceneModel[];
}
