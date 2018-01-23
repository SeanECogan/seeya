export class LinkModel {
  /**
   * Generates a new LinkModel object, to connect two Scenes together.
   */
  constructor(
    fromSceneId: number,
    toSceneId: number
  ) {
    this.fromSceneId = fromSceneId;
    this.toSceneId = toSceneId;
  }

  fromSceneId: number;
  toSceneId: number;
}
