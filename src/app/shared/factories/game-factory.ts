import { SceneModel } from '../models/scene-model';
import { GameModel } from '../models/game-model';

export class GameFactory {

    createGame(
        initialSceneId: number,
        scenes: SceneModel[]
    ): GameModel {
        return new GameModel(
            initialSceneId,
            scenes
        );
    }
}
