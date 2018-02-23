import { SceneModel } from '../models/scene-model';
import { LinkModel } from '../models/link-model';
import { FlagModel } from '../models/flag-model';

export class SceneFactory {
    createScene(
        sceneId: number,
        header: string,
        description: string,
        imageUrl: string,
        links: LinkModel[],
        flags: FlagModel[]
    ): SceneModel {
        return new SceneModel(
            sceneId,
            header,
            description,
            imageUrl,
            links,
            flags
        );
    }
}
