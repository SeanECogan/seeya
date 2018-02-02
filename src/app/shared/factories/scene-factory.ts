import { SceneModel } from '../models/scene-model';
import { LinkModel } from '../models/link-model';

export class SceneFactory {

    createScene(
        sceneId: number,
        header: string,
        description: string,
        links: LinkModel[]
    ): SceneModel {
        return new SceneModel(
            sceneId,
            header,
            description,
            links
        );
    }
}
