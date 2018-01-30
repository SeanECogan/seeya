import { LinkModel } from '../models/link-model';

export class LinkFactory {
    /**
     * Creates a new LinkModel object.
     */
    createLink(
        fromSceneId: number,
        toSceneId: number,
        displayText: string
    ): LinkModel {
        return new LinkModel(
            fromSceneId,
            toSceneId,
            displayText
        );
    }
}
