import { FlagModel } from '../models/flag-model';

export class FlagFactory {
    /**
     * Creates a new FlagModel object.
     */
    createFlag(
        id: number,
        sceneId: number,
        name: string,
        isSet: boolean
    ): FlagModel {
        return new FlagModel(
          id,
          sceneId,
          name,
          isSet
        );
    }
}
