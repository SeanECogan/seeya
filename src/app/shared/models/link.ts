export class Link {
  /**
   * Generates a new Link object, to connect two Scenes together.
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
