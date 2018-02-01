import { TestBed, inject } from '@angular/core/testing';

import { SceneService } from './scene.service';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { GameModel } from '../../shared/models/game-model';
import { MatDialog } from '@angular/material';

describe('SceneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SceneService,
        { provide: MatDialog, useValue: {
          open: () => {}
        } }
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

  it('should return a scene count of zero before any scenes are added',
    inject([SceneService], (service: SceneService) => {
    expect(service.getNumberOfScenes()).toBe(0);
  }));

  it('should return a single scene after one scene is added',
    inject([SceneService], (service: SceneService) => {

    // Scene gets ID of 1.
    service.addScene('Header', 'Description');

    expect(service.getScenes().length).toBe(1);
    expect(service.getScenes()[0].id).toBe(1);
    expect(service.getScenes()[0].header).toBe('Header');
    expect(service.getScenes()[0].description).toBe('Description');
    expect(service.getScenes()[0].link).toBe(null);
  }));

  it('should return a scene count of one after one scene is added',
    inject([SceneService], (service: SceneService) => {

    // Scene gets ID of 2.
    service.addScene('Header', 'Description');

    expect(service.getNumberOfScenes()).toBe(1);
  }));

  it('should link the first scene to the second after a second scene is added',
    inject([SceneService], (service: SceneService) => {

    // Scenes get IDs of 3 and 4.
    service.addScene('Header', 'Description');
    service.addSceneWithLink('Header2', 'Description2', 'Display');

    expect(service.getScenes().length).toBe(2, 'Length of scenes array');
    expect(service.getScenes()[0].id).toBe(3, 'First scene ID');
    expect(service.getScenes()[0].header).toBe('Header', 'First scene header');
    expect(service.getScenes()[0].description).toBe('Description', 'First scene description');
    expect(service.getScenes()[0].link.fromSceneId).toBe(3, 'First scene link from scene ID');
    expect(service.getScenes()[0].link.toSceneId).toBe(4, 'First scene link to scene ID');
  }));

  it('should update the scene when it is edited',
    inject([SceneService], (service: SceneService) => {

    service['scenes'] = [
      new SceneModel(1, 'Test1', 'Test1', null)
    ];

    service.editScene(1, 'Test2', 'Test2');

    expect(service.getScenes().length).toBe(1);
    expect(service.getScenes()[0].id).toBe(1);
    expect(service.getScenes()[0].header).toBe('Test2');
    expect(service.getScenes()[0].description).toBe('Test2');
    expect(service.getScenes()[0].link).toBeNull();
  }));

  it('should just remove the scene if the first scene is deleted',
    inject([SceneService], (service: SceneService) => {

    service['scenes'] = [
      new SceneModel(1, 'Test1', 'Test1', new LinkModel(1, 2, 'Test1')),
      new SceneModel(2, 'Test2', 'Test2', null)
    ];

    service.deleteScene(1);

    expect(service.getScenes().length).toBe(1, 'Length of scenes array');
    expect(service.getScenes()[0].id).toBe(2, 'First scene ID');
    expect(service.getScenes()[0].header).toBe('Test2', 'First scene header');
    expect(service.getScenes()[0].description).toBe('Test2', 'First scene description');
    expect(service.getScenes()[0].link).toBeNull();
  }));

  it('should remove the link from the second last scene if the last scene is deleted',
    inject([SceneService], (service: SceneService) => {

    service['scenes'] = [
      new SceneModel(1, 'Test1', 'Test1', new LinkModel(1, 2, 'Test1')),
      new SceneModel(2, 'Test2', 'Test2', null)
    ];

    service.deleteScene(2);

    expect(service.getScenes().length).toBe(1, 'Length of scenes array');
    expect(service.getScenes()[0].id).toBe(1, 'First scene ID');
    expect(service.getScenes()[0].header).toBe('Test1', 'First scene header');
    expect(service.getScenes()[0].description).toBe('Test1', 'First scene description');
    expect(service.getScenes()[0].link).toBeNull();
  }));

  it('should update the link from the previous scene if a middle scene is deleted',
    inject([SceneService], (service: SceneService) => {

    service['scenes'] = [
      new SceneModel(1, 'Test1', 'Test1', new LinkModel(1, 2, 'Test1')),
      new SceneModel(2, 'Test2', 'Test2', new LinkModel(2, 3, 'Test2')),
      new SceneModel(3, 'Test3', 'Test3', null)
    ];

    service.deleteScene(2);

    expect(service.getScenes().length).toBe(2, 'Length of scenes array');
    expect(service.getScenes()[0].id).toBe(1, 'First scene ID');
    expect(service.getScenes()[0].header).toBe('Test1', 'First scene header');
    expect(service.getScenes()[0].description).toBe('Test1', 'First scene description');
    expect(service.getScenes()[0].link.fromSceneId).toBe(1, 'First scene from scene id');
    expect(service.getScenes()[0].link.toSceneId).toBe(3, 'First scene updated to scene id');
  }));

  it('should export the scenes to a base64-encoded string',
    inject([SceneService], (service: SceneService) => {

    service['scenes'] = [
      new SceneModel(5, 'Header', 'Description', new LinkModel(5, 6, 'Display')),
      new SceneModel(6, 'Header2', 'Description2', null)
    ];

    /* tslint:disable:max-line-length */
    expect(service.exportGame()).toBe('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6NiwiZGlzcGxheVRleHQiOiJEaXNwbGF5In19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0=');
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
