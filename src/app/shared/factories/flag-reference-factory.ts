import { FlagReferenceModel } from '../models/flag-reference-model';

export class FlagReferenceFactory {
    /**
     * Creates a new FlagReferenceModel object.
     */
    createFlagReference(
        id: number,
        sceneId: number
    ): FlagReferenceModel {
        return new FlagReferenceModel(
          id,
          sceneId
        );
    }
}
