import { TestBed, inject } from '@angular/core/testing';

import { SceneService } from './scene.service';
import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';
import { FlagModel } from '../../shared/models/flag-model';

describe('SceneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SceneService]
    });
  });

  it('should be created', inject([SceneService], (service: SceneService) => {
    expect(service).toBeTruthy();
  }));

  it('should throw an error when importing an invalid game string',
    inject([SceneService], (service: SceneService) => {
      expect(() => service.importGame('Test')).toThrowError();
    }));

  it('should not throw an error when importing a valid game string',
    inject([SceneService], (service: SceneService) => {

      /* tslint:disable:max-line-length */
      expect(() => service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0'))
        .not.toThrowError();
      /* tsline:enable:max-line-length */
    }));

  it('should not throw an error when importing a valid game string, even if the string translates to Unicode',
    inject([SceneService], (service: SceneService) => {

      /* tslint:disable:max-line-length */
      expect(() => service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImRlc2NyaXB0aW9uIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6NSwidG9TY2VuZUlkIjo2LCJkaXNwbGF5VGV4dCI6IkRpc3BsYXkifV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmtzIjpudWxsfV19'))
        .not.toThrowError();
      /* tsline:enable:max-line-length */
    }));

  it('should return null for current scene before game is started',
    inject([SceneService], (service: SceneService) => {
      expect(service.getCurrentScene()).toBeNull();
    }));

  it('should return 0 for number of scenes before game is started',
    inject([SceneService], (service: SceneService) => {
      expect(service.getNumberOfScenes()).toBe(0);
    }));

  it('should return current scene after game is started',
    inject([SceneService], (service: SceneService) => {
      /* tslint:disable:max-line-length */
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');
      /* tslint:enable:max-line-length */

      service.startGame();

      expect(service.getCurrentScene()).toBeTruthy();
    }));

  it('should return correct number of scenes after game is started',
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      /* tslint:disable:max-line-length */
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');
      /* tslint:enable:max-line-length */

      service.startGame();

      expect(service.getNumberOfScenes()).toBe(2);
    }));

  it('should return correct scene after load next scene is called',
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      /* tslint:disable:max-line-length */
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');
      /* tslint:enable:max-line-length */

      service.startGame();

      service.loadNextScene(6);

      const nextScene = service.getCurrentScene();

      expect(nextScene).toBeTruthy();
      expect(nextScene.id).toBe(6);
    }));

  it('should not have the game finished if there is no current scene',
    inject([SceneService], (service: SceneService) => {
      expect(service.gameIsFinished()).toBeFalsy();
    }));

  it('should not have the game finished if the current scene is linked to another',
    inject([SceneService], (service: SceneService) => {
      service['initialSceneId'] = 5;
      service['scenes'] = [
        new SceneModel(
          5,
          'Header',
          'Description',
          '',
          [
            new LinkModel(5, 6, 'Test', new Array<FlagReferenceModel>())
          ],
          new Array<FlagModel>()
        ),
        new SceneModel(
          6,
          'Header2',
          'Description2',
          '',
          new Array<LinkModel>(),
          new Array<FlagModel>()
        )
      ];

      service.startGame();

      expect(service.gameIsFinished()).toBeFalsy();
    }));

  it('should have the game finished if the current scene is not linked to another',
    inject([SceneService], (service: SceneService) => {
      service['initialSceneId'] = 5;
      service['scenes'] = [
        new SceneModel(
          5,
          'Header',
          'Description',
          '',
          [
            new LinkModel(5, 6, 'Test', new Array<FlagReferenceModel>())
          ],
          new Array<FlagModel>()
        ),
        new SceneModel(
          6,
          'Header2',
          'Description2',
          '',
          new Array<LinkModel>(),
          new Array<FlagModel>()
        )
      ];

      service.startGame();

      service.loadNextScene(6);

      expect(service.gameIsFinished()).toBeTruthy();
    }));
});
