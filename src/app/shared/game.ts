import { Scene } from "./scene";

export class Game {
  /**
   * Generates a Game object, which houses the adventure-level information
   * for the entire game.
   */
  constructor(
    initialSceneId: number,
    scenes: Scene[]
  ) {
    this.initialSceneId = initialSceneId;
    this.scenes = scenes;
  }

  initialSceneId: number;
  scenes: Scene[];
}
