import { LinkModel } from '../models/link-model';
import { FlagReferenceModel } from '../models/flag-reference-model';

export class LinkFactory {
    /**
     * Creates a new LinkModel object.
     */
    createLink(
      fromSceneId: number,
      toSceneId: number,
      displayText: string,
      flagReferences: FlagReferenceModel[]
    ): LinkModel {
      if (flagReferences === null ||
          flagReferences === undefined) {
            flagReferences = new Array<FlagReferenceModel>()
          }

        return new LinkModel(
          fromSceneId,
          toSceneId,
          displayText,
          flagReferences
        );
    }
}
