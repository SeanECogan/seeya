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

  it('should export the scenes to a base64-encoded string',
    inject([SceneService], (service: SceneService) => {

    // Scenes get IDs of 5 and 6.
    service.addScene('Header', 'Description');
    service.addSceneWithLink('Header2', 'Description2', 'Display');

    /* tslint:disable:max-line-length */
    expect(service.exportGame()).toBe('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6NiwiZGlzcGxheVRleHQiOiJEaXNwbGF5In19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0=');
    /* tslint:enable:max-line-length */
  }));
});
