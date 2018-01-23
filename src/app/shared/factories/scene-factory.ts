import { SceneModel } from "../models/scene-model";
import { LinkModel } from "../models/link-model";

// Static sceneId value for all instance of SceneFactory.
let sceneId = 1;

export class SceneFactory {

    createSceneWithoutLink(
        header: string,
        description: string
    ): SceneModel {
        return new SceneModel(
            sceneId++,
            header,
            description,
            null
        );
    };

    createSceneWithLink(
        existingScene: SceneModel,
        link: LinkModel
    ): SceneModel {
        return new SceneModel(
            existingScene.id,
            existingScene.header,
            existingScene.description,
            link
        );
    }
}
