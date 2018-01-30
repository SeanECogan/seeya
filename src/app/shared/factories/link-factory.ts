import { LinkModel } from '../models/link-model';

export class LinkFactory {
    /**
     * Creates a new LinkModel object.
     */
    createLink(
        fromSceneId: number,
        toSceneId: number
    ): LinkModel {
        return new LinkModel(
            fromSceneId,
            toSceneId
        );
    }
}
