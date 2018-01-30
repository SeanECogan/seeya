export class LinkModel {
  /**
   * Generates a new LinkModel object, to connect two Scenes together.
   */
  constructor(
    fromSceneId: number,
    toSceneId: number,
    displayText: string
  ) {
    this.fromSceneId = fromSceneId;
    this.toSceneId = toSceneId;
    this.displayText = displayText;
  }

  fromSceneId: number;
  toSceneId: number;
  displayText: string;
}
