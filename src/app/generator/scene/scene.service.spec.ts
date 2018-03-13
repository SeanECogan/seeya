import { TestBed, inject } from '@angular/core/testing';

import { SceneService } from './scene.service';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { GameModel } from '../../shared/models/game-model';
import { FlagModel } from '../../shared/models/flag-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';

describe('SceneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SceneService
      ]
    });
  });

  it('should be created',
    inject([SceneService], (service: SceneService) => {
      expect(service).toBeTruthy();
    }));

  it('should return the initialSceneId from getInitialSceneId',
    inject([SceneService], (service: SceneService) => {
      service['initialSceneId'] = 1;

      expect(service.getInitialSceneId()).toBe(1);
    }));

  it('should set the initialSceneId from setInitialSceneId',
    inject([SceneService], (service: SceneService) => {
      service['initialSceneId'] = 1;

      service.setInitialSceneId(2);

      expect(service['initialSceneId']).toBe(2);
    }));

  it('should return no scenes before any scenes are added',
    inject([SceneService], (service: SceneService) => {
      expect(service.getScenes().length).toBe(0);
    }));

  it('should return all scenes from getScenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(2, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getScenes().length).toBe(3);
    }));

  it('should return a scene count of zero before any scenes are added',
    inject([SceneService], (service: SceneService) => {
      expect(service.getNumberOfScenes()).toBe(0);
    }));

  it('should return the number of scenes from getNumberOfScenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(2, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getNumberOfScenes()).toBe(3);
    }));

  it('should return 1 as the next scene id if there are no other scenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = new Array<SceneModel>();

      expect(service.getNextSceneId()).toBe(1);
    }));

  it('should return 1 higher than the current max scene id as the next scene id if there are other scenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getNextSceneId()).toBe(7);
    }));

  it('should add a scene to the existing scenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(2, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.addScene(4, 'Test4', 'Test4', '', new Array<LinkModel>(), new Array<FlagModel>());

      expect(service.getNumberOfScenes()).toBe(4);
      expect(service.getScenes()[3].id).toBe(4, 'New Scene Id');
      expect(service.getScenes()[3].header).toBe('Test4', 'New Scene Header');
      expect(service.getScenes()[3].description).toBe('Test4', 'New Scene Description');
      expect(service.getScenes()[3].links.length).toBe(0, 'New Scene Links');
      expect(service.getScenes()[3].flags.length).toBe(0, 'New Scene Flags');
    }));

  it('should update the scene when it is edited',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', 'Test1', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.editScene(1, 'Test2', 'Test2', 'Test2', new Array<LinkModel>(), new Array<FlagModel>());

      expect(service.getScenes().length).toBe(1);
      expect(service.getScenes()[0].id).toBe(1);
      expect(service.getScenes()[0].header).toBe('Test2');
      expect(service.getScenes()[0].description).toBe('Test2');
      expect(service.getScenes()[0].imageUrl).toBe('Test2');
      expect(service.getScenes()[0].links.length).toBe(0);
      expect(service.getScenes()[0].flags.length).toBe(0);
    }));

  it('should not do anything if the SceneToEdit does not already exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.editScene(2, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>());

      expect(service.getScenes().length).toBe(1);
      expect(service.getScenes()[0].id).toBe(1);
      expect(service.getScenes()[0].header).toBe('Test1');
      expect(service.getScenes()[0].description).toBe('Test1');
      expect(service.getScenes()[0].links.length).toBe(0);
      expect(service.getScenes()[0].flags.length).toBe(0);
    }));

  it('should delete the specified Scene',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.deleteScene(1);

      expect(service.getScenes().length).toBe(0);
    }));

  it('should not delete the specified Scene if it does not exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.deleteScene(2);

      expect(service.getScenes().length).toBe(1);
    }));

  it('should delete any existing Links to the deleted Scene',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(2, 'Test1', 'Test1', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test1', 'Test1', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      service.deleteScene(2);

      expect(service.getScenes().length).toBe(2, 'Number of scenes');
      expect(service.getScenes()[0].links.length).toBe(1, 'Number of links');
    }));

  it('should return 1 as the next flag id if there are no other flags',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = new Array<SceneModel>();

      expect(service.getNextFlagId()).toBe(1);
    }));

  it('should return 1 higher than the current max flag id as the next scene id if there are other flags',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], [
          new FlagModel(1, 1, 'Test', false)
        ]),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), [
          new FlagModel(2, 6, 'Test', false)
        ]),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getNextFlagId()).toBe(3);
    }));

  it('should return flags from all scenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], [
          new FlagModel(1, 1, 'Test', false)
        ]),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), [
          new FlagModel(2, 6, 'Test', false)
        ]),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getAllFlags().length).toBe(2);
    }));

  it('should return the flag model if the scene and flag exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], [
          new FlagModel(1, 1, 'Test', false)
        ]),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), [
          new FlagModel(2, 6, 'Test', false)
        ]),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getFlag(1, 1)).toBeTruthy();
    }));

  it('should return falsy value if the scene does not exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], [
          new FlagModel(1, 1, 'Test', false)
        ]),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), [
          new FlagModel(2, 6, 'Test', false)
        ]),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getFlag(2, 1)).toBeFalsy();
    }));

  it('should return falsy value if the flag does not exist on the existing scene',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], [
          new FlagModel(1, 1, 'Test', false)
        ]),
        new SceneModel(6, 'Test2', 'Test2', '', new Array<LinkModel>(), [
          new FlagModel(2, 6, 'Test', false)
        ]),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];

      expect(service.getFlag(6, 1)).toBeFalsy();
    }));

  it('should export the scenes to a base64-encoded string',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(
          5,
          'Header',
          'Description',
          '',
          [new LinkModel(5, 6, 'Display', new Array<FlagReferenceModel>())],
          [new FlagModel(1, 5, 'Test', false)]),
        new SceneModel(6, 'Header2', 'Description2', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];
      service['initialSceneId'] = 5;

      /* tslint:disable:max-line-length */
      expect(service.exportGame()).toBe('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjo1LCJ0b1NjZW5lSWQiOjYsImRpc3BsYXlUZXh0IjoiRGlzcGxheSIsImZsYWdSZWZlcmVuY2VzIjpbXX1dLCJmbGFncyI6W3siaWQiOjEsInNjZW5lSWQiOjUsIm5hbWUiOiJUZXN0IiwiaXNTZXQiOmZhbHNlfV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImltYWdlVXJsIjoiIiwibGlua3MiOltdLCJmbGFncyI6W119XX0=');
      /* tslint:enable:max-line-length */
    }));

  it('should export the scenes to a base64-encoded string, even if the Scenes contain Unicode',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(
          5,
          'z̭͍̥͙͗ä͔͓́̐ͅḻ̩̘̜̗̫͆ͫg̔̅͆̓̾o͖̦',
          'z̭͍̥͙͗ä͔͓́̐ͅḻ̩̘̜̗̫͆ͫg̔̅͆̓̾o͖̦',
          '',
          [new LinkModel(5, 6, 'Display', new Array<FlagReferenceModel>())],
          [new FlagModel(1, 5, 'Test', false)]),
        new SceneModel(6, 'Header2', 'Description2', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];
      service['initialSceneId'] = 5;

      /* tslint:disable:max-line-length */
      expect(service.exportGame()).toBe('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImRlc2NyaXB0aW9uIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjo1LCJ0b1NjZW5lSWQiOjYsImRpc3BsYXlUZXh0IjoiRGlzcGxheSIsImZsYWdSZWZlcmVuY2VzIjpbXX1dLCJmbGFncyI6W3siaWQiOjEsInNjZW5lSWQiOjUsIm5hbWUiOiJUZXN0IiwiaXNTZXQiOmZhbHNlfV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImltYWdlVXJsIjoiIiwibGlua3MiOltdLCJmbGFncyI6W119XX0=');
      /* tslint:enable:max-line-length */
    }));

  it('should throw an error when importing an invalid game string',
    inject([SceneService], (service: SceneService) => {
      expect(() => service.importGame('Test')).toThrowError();
    }));

  it('should not throw an error when importing a valid game string',
    inject([SceneService], (service: SceneService) => {

      /* tslint:disable:max-line-length */
      expect(() => service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImltYWdlRGF0YSI6IiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6NSwidG9TY2VuZUlkIjo2LCJkaXNwbGF5VGV4dCI6IkRpc3BsYXkifV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImltYWdlRGF0YSI6IiIsImxpbmtzIjpbXX1dfQ=='))
        .not.toThrowError();
      /* tsline:enable:max-line-length */

      expect(service['initialSceneId']).toBe(5);
      expect(service['scenes'].length).toBe(2);
    }));

  it('should not throw an error when importing a valid game string, even if the string translates to Unicode',
    inject([SceneService], (service: SceneService) => {

      /* tslint:disable:max-line-length */
      expect(() => service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImRlc2NyaXB0aW9uIjoies2XzK3NjcylzZlhzYTMkM2UzZPNhWzNhs2rzLHMqcyYzJzMl8yrZ8yUzIXNhs2DzL5vzZbMpiIsImltYWdlRGF0YSI6IiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6NSwidG9TY2VuZUlkIjo2LCJkaXNwbGF5VGV4dCI6IkRpc3BsYXkifV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImltYWdlRGF0YSI6IiIsImxpbmtzIjpbXX1dfQ=='))
        .not.toThrowError();
      /* tsline:enable:max-line-length */

      expect(service['initialSceneId']).toBe(5);
      expect(service['scenes'].length).toBe(2);
    }));
});
