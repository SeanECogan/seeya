export class FlagModel {
  /**
   * Generates a new FlagModel object, when will be used to toggle Links in
   * the Runner.
   */
  constructor(
    id: number,
    sceneId: number,
    name: string,
    isSet: boolean
  ) {
    this.id = id;
    this.sceneId = sceneId;
    this.name = name;
    this.isSet = isSet;
  }

  id: number;
  sceneId: number;
  name: string;
  isSet: boolean;
}
