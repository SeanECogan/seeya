import { TestBed, inject } from '@angular/core/testing';

import { SceneService } from './scene.service';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { GameModel } from '../../shared/models/game-model';

describe('SceneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SceneService
      ]
    });
  });

  it('should be created', inject([SceneService], (service: SceneService) => {
    expect(service).toBeTruthy();
  }));

  it('should return no scenes before any scenes are added',
    inject([SceneService], (service: SceneService) => {
      expect(service.getScenes().length).toBe(0);
    }));

  it('should return all scenes from getScenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', [
          new LinkModel(1, 2, 'Test'),
          new LinkModel(1, 3, 'Test')
        ]),
        new SceneModel(2, 'Test2', 'Test2', new Array<LinkModel>()),
        new SceneModel(3, 'Test3', 'Test3', new Array<LinkModel>())
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
        new SceneModel(1, 'Test', 'Test', [
          new LinkModel(1, 2, 'Test'),
          new LinkModel(1, 3, 'Test')
        ]),
        new SceneModel(2, 'Test2', 'Test2', new Array<LinkModel>()),
        new SceneModel(3, 'Test3', 'Test3', new Array<LinkModel>())
      ];

      expect(service.getNumberOfScenes()).toBe(3);
    }));

  it('should add a scene to the existing scenes',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test', 'Test', [
          new LinkModel(1, 2, 'Test'),
          new LinkModel(1, 3, 'Test')
        ]),
        new SceneModel(2, 'Test2', 'Test2', new Array<LinkModel>()),
        new SceneModel(3, 'Test3', 'Test3', new Array<LinkModel>())
      ];

      service.addScene('Test4', 'Test4', new Array<LinkModel>());

      expect(service.getNumberOfScenes()).toBe(4);
      expect(service.getScenes()[3].id).toBe(4, 'New Scene Id');
      expect(service.getScenes()[3].header).toBe('Test4', 'New Scene Header');
      expect(service.getScenes()[3].description).toBe('Test4', 'New Scene Description');
      expect(service.getScenes()[3].links.length).toBe(0, 'New Scene Links');
    }));

  it('should update the scene when it is edited',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', new Array<LinkModel>())
      ];

      service.editScene(1, 'Test2', 'Test2', new Array<LinkModel>());

      expect(service.getScenes().length).toBe(1);
      expect(service.getScenes()[0].id).toBe(1);
      expect(service.getScenes()[0].header).toBe('Test2');
      expect(service.getScenes()[0].description).toBe('Test2');
      expect(service.getScenes()[0].links.length).toBe(0);
    }));

  it('should not do anything if the SceneToEdit does not already exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', new Array<LinkModel>())
      ];

      service.editScene(2, 'Test2', 'Test2', new Array<LinkModel>());

      expect(service.getScenes().length).toBe(1);
      expect(service.getScenes()[0].id).toBe(1);
      expect(service.getScenes()[0].header).toBe('Test1');
      expect(service.getScenes()[0].description).toBe('Test1');
      expect(service.getScenes()[0].links.length).toBe(0);
    }));

  it('should delete the specified Scene',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', new Array<LinkModel>())
      ];

      service.deleteScene(1);

      expect(service.getScenes().length).toBe(0);
    }));

  it('should not delete the specified Scene if it does not exist',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', new Array<LinkModel>())
      ];

      service.deleteScene(2);

      expect(service.getScenes().length).toBe(1);
    }));

  it('should delete any existing Links to the deleted Scene',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(1, 'Test1', 'Test1', [
          new LinkModel(1, 2, 'Test'),
          new LinkModel(1, 3, 'Test')
        ]),
        new SceneModel(2, 'Test1', 'Test1', new Array<LinkModel>()),
        new SceneModel(3, 'Test1', 'Test1', new Array<LinkModel>())
      ];

      service.deleteScene(2);

      expect(service.getScenes().length).toBe(2, 'Number of scenes');
      expect(service.getScenes()[0].links.length).toBe(1, 'Number of links');
    }));

  it('should export the scenes to a base64-encoded string',
    inject([SceneService], (service: SceneService) => {

      service['scenes'] = [
        new SceneModel(
          5,
          'Header',
          'Description',
          [new LinkModel(5, 6, 'Display')]),
        new SceneModel(6, 'Header2', 'Description2', null)
      ];

      /* tslint:disable:max-line-length */
      expect(service.exportGame()).toBe('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6NSwidG9TY2VuZUlkIjo2LCJkaXNwbGF5VGV4dCI6IkRpc3BsYXkifV19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmtzIjpudWxsfV19');
      /* tslint:enable:max-line-length */
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
});
