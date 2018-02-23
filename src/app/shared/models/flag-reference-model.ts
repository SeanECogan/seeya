export class FlagReferenceModel {
  /**
   * Generates a new FlagReferenceModel, which is how a Link will look up
   * its attached Flags.
   */
  constructor(
    id: number,
    sceneId: number
  ) {
    this.id = id;
    this.sceneId = sceneId;
  }

  id: number;
  sceneId: number;
}
