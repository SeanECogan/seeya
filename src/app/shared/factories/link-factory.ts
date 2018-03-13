import { LinkModel } from '../models/link-model';
import { FlagReferenceModel } from '../models/flag-reference-model';
import { FlagModel } from '../models/flag-model';
import { FlagReferenceFactory } from './flag-reference-factory';

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
            flagReferences = new Array<FlagReferenceModel>();
          }

        return new LinkModel(
          fromSceneId,
          toSceneId,
          displayText,
          flagReferences
        );
    }

    /**
     * Creates a new LinkModel object.
     */
    createLinkFromFlags(
      fromSceneId: number,
      toSceneId: number,
      displayText: string,
      flags: FlagModel[]
    ): LinkModel {
      const flagReferences = new Array<FlagReferenceModel>();

      if (flags !== null &&
          flags !== undefined) {

        flags.map(flag => {
          const frf = new FlagReferenceFactory();

          flagReferences.push(frf.createFlagReference(
            flag.id,
            flag.sceneId
          ));
        });
      }

      return new LinkModel(
        fromSceneId,
        toSceneId,
        displayText,
        flagReferences
      );
    }
}
