import { FlagReferenceModel } from './flag-reference-model';

export class LinkModel {
  /**
   * Generates a new LinkModel object, to connect two Scenes together.
   */
  constructor(
    fromSceneId: number,
    toSceneId: number,
    displayText: string,
    flagReferences: FlagReferenceModel[]
  ) {
    this.fromSceneId = fromSceneId;
    this.toSceneId = toSceneId;
    this.displayText = displayText;
    this.flagReferences = flagReferences;
  }

  fromSceneId: number;
  toSceneId: number;
  displayText: string;
  flagReferences: FlagReferenceModel[];
}
