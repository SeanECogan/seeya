import { TestBed, inject } from '@angular/core/testing';

import { SceneService } from './scene.service';

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
    expect(() => service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0'))
      .not.toThrowError();
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
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');

      service.startGame();

      expect(service.getCurrentScene()).toBeTruthy();
  }));

  it('should return correct number of scenes after game is started', 
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');

      service.startGame();

      expect(service.getNumberOfScenes()).toBe(2);
  }));

  it('should return correct scene after load next scene is called', 
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');

      service.startGame();

      service.loadNextScene(6);

      let nextScene = service.getCurrentScene();

      expect(nextScene).toBeTruthy();
      expect(nextScene.id).toBe(6);
  }));

  it('should not have the game finished if there is no current scene', 
    inject([SceneService], (service: SceneService) => {
      expect(service.gameIsFinished()).toBeFalsy();
  }));

  it('should not have the game finished if the current scene is linked to another', 
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');

      service.startGame();

      expect(service.gameIsFinished()).toBeFalsy();
  }));

  it('should have the game finished if the current scene is not linked to another', 
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6Nn19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0');

      service.startGame();

      service.loadNextScene(6);
      
      expect(service.gameIsFinished()).toBeTruthy();
  }));
});
