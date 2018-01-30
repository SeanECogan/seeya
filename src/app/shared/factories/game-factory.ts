import { SceneModel } from '../models/scene-model';
import { GameModel } from '../models/game-model';

export class GameFactory {

    createGame(
        scenes: SceneModel[]
    ): GameModel {
        // For now, get the lowest Scene ID for the starting scene.
        const initialSceneId = Math.min(...scenes.map(scene => scene.id));

        return new GameModel(
            initialSceneId,
            scenes
        );
    }
}
