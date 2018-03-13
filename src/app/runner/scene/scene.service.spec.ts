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
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6MSwic2NlbmVzIjpbeyJpZCI6MSwiaGVhZGVyIjoiQSBEYXJrIEhhbGx3YXkiLCJkZXNjcmlwdGlvbiI6IllvdSBzdGFuZCBpbiBhIGRpbWx5LWxpdCBoYWxsd2F5IHdpdGggdGhyZWUgZG9vcnMgaW4gZnJvbnQgb2YgeW91LlxuXG5UaGUgZG9vciBvbiB0aGUgbGVmdCBpcyBncmVlbiwgYW5kIGFwcGVhcnMgdG8gYmUgdW5sb2NrZWQuXG5cblRoZSBkb29yIGluIHRoZSBtaWRkbGUgaXMgYmx1ZSwgYW5kIGFsc28gYXBwZWFycyB0byBiZSB1bmxvY2tlZC5cblxuVGhlIGRvb3Igb24gdGhlIHJpZ2h0IGlzIHJlZCwgYW5kIGhhcyBhIGdyZWVuIHBhZGxvY2sgYW5kIGEgYmx1ZSBwYWRsb2NrIG9uIGl0LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjoxLCJ0b1NjZW5lSWQiOjIsImRpc3BsYXlUZXh0IjoiT3BlbiB0aGUgR3JlZW4gRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjozLCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIEJsdWUgRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjo0LCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIFJlZCBEb29yIiwiZmxhZ1JlZmVyZW5jZXMiOlt7ImlkIjowLCJzY2VuZUlkIjoyfSx7ImlkIjoxLCJzY2VuZUlkIjozfV19XSwiZmxhZ3MiOltdfSx7ImlkIjoyLCJoZWFkZXIiOiJBIEdyZWVuIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGdyZWVuIGtleS5cblxuWW91IHRha2UgdGhlIGtleS4iLCJpbWFnZVVybCI6IiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6MiwidG9TY2VuZUlkIjoxLCJkaXNwbGF5VGV4dCI6IlJldHVybiB0byB0aGUgSGFsbHdheSIsImZsYWdSZWZlcmVuY2VzIjpbXX1dLCJmbGFncyI6W3siaWQiOjAsInNjZW5lSWQiOjIsIm5hbWUiOiJGbGFnIDEiLCJpc1NldCI6ZmFsc2V9XX0seyJpZCI6MywiaGVhZGVyIjoiQSBCbHVlIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGJsdWUga2V5LlxuXG5Zb3UgdGFrZSB0aGUga2V5LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjozLCJ0b1NjZW5lSWQiOjEsImRpc3BsYXlUZXh0IjoiUmV0dXJuIHRvIHRoZSBIYWxsd2F5IiwiZmxhZ1JlZmVyZW5jZXMiOltdfV0sImZsYWdzIjpbeyJpZCI6MSwic2NlbmVJZCI6MywibmFtZSI6IkZsYWcgMiIsImlzU2V0IjpmYWxzZX1dfSx7ImlkIjo0LCJoZWFkZXIiOiJBIFJlZCBSb29tIiwiZGVzY3JpcHRpb24iOiJBIHNpZ24gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBzYXlzIFwiWW91IHdpbiFcIiIsImltYWdlVXJsIjoiIiwibGlua3MiOltdLCJmbGFncyI6W119XX0=');
      /* tslint:enable:max-line-length */

      service.startGame();

      expect(service.getCurrentScene()).toBeTruthy();
    }));

  it('should return correct number of scenes after game is started',
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      /* tslint:disable:max-line-length */
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6MSwic2NlbmVzIjpbeyJpZCI6MSwiaGVhZGVyIjoiQSBEYXJrIEhhbGx3YXkiLCJkZXNjcmlwdGlvbiI6IllvdSBzdGFuZCBpbiBhIGRpbWx5LWxpdCBoYWxsd2F5IHdpdGggdGhyZWUgZG9vcnMgaW4gZnJvbnQgb2YgeW91LlxuXG5UaGUgZG9vciBvbiB0aGUgbGVmdCBpcyBncmVlbiwgYW5kIGFwcGVhcnMgdG8gYmUgdW5sb2NrZWQuXG5cblRoZSBkb29yIGluIHRoZSBtaWRkbGUgaXMgYmx1ZSwgYW5kIGFsc28gYXBwZWFycyB0byBiZSB1bmxvY2tlZC5cblxuVGhlIGRvb3Igb24gdGhlIHJpZ2h0IGlzIHJlZCwgYW5kIGhhcyBhIGdyZWVuIHBhZGxvY2sgYW5kIGEgYmx1ZSBwYWRsb2NrIG9uIGl0LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjoxLCJ0b1NjZW5lSWQiOjIsImRpc3BsYXlUZXh0IjoiT3BlbiB0aGUgR3JlZW4gRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjozLCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIEJsdWUgRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjo0LCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIFJlZCBEb29yIiwiZmxhZ1JlZmVyZW5jZXMiOlt7ImlkIjowLCJzY2VuZUlkIjoyfSx7ImlkIjoxLCJzY2VuZUlkIjozfV19XSwiZmxhZ3MiOltdfSx7ImlkIjoyLCJoZWFkZXIiOiJBIEdyZWVuIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGdyZWVuIGtleS5cblxuWW91IHRha2UgdGhlIGtleS4iLCJpbWFnZVVybCI6IiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6MiwidG9TY2VuZUlkIjoxLCJkaXNwbGF5VGV4dCI6IlJldHVybiB0byB0aGUgSGFsbHdheSIsImZsYWdSZWZlcmVuY2VzIjpbXX1dLCJmbGFncyI6W3siaWQiOjAsInNjZW5lSWQiOjIsIm5hbWUiOiJGbGFnIDEiLCJpc1NldCI6ZmFsc2V9XX0seyJpZCI6MywiaGVhZGVyIjoiQSBCbHVlIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGJsdWUga2V5LlxuXG5Zb3UgdGFrZSB0aGUga2V5LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjozLCJ0b1NjZW5lSWQiOjEsImRpc3BsYXlUZXh0IjoiUmV0dXJuIHRvIHRoZSBIYWxsd2F5IiwiZmxhZ1JlZmVyZW5jZXMiOltdfV0sImZsYWdzIjpbeyJpZCI6MSwic2NlbmVJZCI6MywibmFtZSI6IkZsYWcgMiIsImlzU2V0IjpmYWxzZX1dfSx7ImlkIjo0LCJoZWFkZXIiOiJBIFJlZCBSb29tIiwiZGVzY3JpcHRpb24iOiJBIHNpZ24gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBzYXlzIFwiWW91IHdpbiFcIiIsImltYWdlVXJsIjoiIiwibGlua3MiOltdLCJmbGFncyI6W119XX0=');
      /* tslint:enable:max-line-length */

      service.startGame();

      expect(service.getNumberOfScenes()).toBe(4);
    }));

  it('should return correct scene after load next scene is called',
    inject([SceneService], (service: SceneService) => {
      // This game string has two scenes.
      /* tslint:disable:max-line-length */
      service.importGame('eyJpbml0aWFsU2NlbmVJZCI6MSwic2NlbmVzIjpbeyJpZCI6MSwiaGVhZGVyIjoiQSBEYXJrIEhhbGx3YXkiLCJkZXNjcmlwdGlvbiI6IllvdSBzdGFuZCBpbiBhIGRpbWx5LWxpdCBoYWxsd2F5IHdpdGggdGhyZWUgZG9vcnMgaW4gZnJvbnQgb2YgeW91LlxuXG5UaGUgZG9vciBvbiB0aGUgbGVmdCBpcyBncmVlbiwgYW5kIGFwcGVhcnMgdG8gYmUgdW5sb2NrZWQuXG5cblRoZSBkb29yIGluIHRoZSBtaWRkbGUgaXMgYmx1ZSwgYW5kIGFsc28gYXBwZWFycyB0byBiZSB1bmxvY2tlZC5cblxuVGhlIGRvb3Igb24gdGhlIHJpZ2h0IGlzIHJlZCwgYW5kIGhhcyBhIGdyZWVuIHBhZGxvY2sgYW5kIGEgYmx1ZSBwYWRsb2NrIG9uIGl0LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjoxLCJ0b1NjZW5lSWQiOjIsImRpc3BsYXlUZXh0IjoiT3BlbiB0aGUgR3JlZW4gRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjozLCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIEJsdWUgRG9vciIsImZsYWdSZWZlcmVuY2VzIjpbXX0seyJmcm9tU2NlbmVJZCI6MSwidG9TY2VuZUlkIjo0LCJkaXNwbGF5VGV4dCI6Ik9wZW4gdGhlIFJlZCBEb29yIiwiZmxhZ1JlZmVyZW5jZXMiOlt7ImlkIjowLCJzY2VuZUlkIjoyfSx7ImlkIjoxLCJzY2VuZUlkIjozfV19XSwiZmxhZ3MiOltdfSx7ImlkIjoyLCJoZWFkZXIiOiJBIEdyZWVuIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGdyZWVuIGtleS5cblxuWW91IHRha2UgdGhlIGtleS4iLCJpbWFnZVVybCI6IiIsImxpbmtzIjpbeyJmcm9tU2NlbmVJZCI6MiwidG9TY2VuZUlkIjoxLCJkaXNwbGF5VGV4dCI6IlJldHVybiB0byB0aGUgSGFsbHdheSIsImZsYWdSZWZlcmVuY2VzIjpbXX1dLCJmbGFncyI6W3siaWQiOjAsInNjZW5lSWQiOjIsIm5hbWUiOiJGbGFnIDEiLCJpc1NldCI6ZmFsc2V9XX0seyJpZCI6MywiaGVhZGVyIjoiQSBCbHVlIFJvb20iLCJkZXNjcmlwdGlvbiI6Ik9uIGEgc21hbGwgcGVkZXN0YWwgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBpcyBhIGJsdWUga2V5LlxuXG5Zb3UgdGFrZSB0aGUga2V5LiIsImltYWdlVXJsIjoiIiwibGlua3MiOlt7ImZyb21TY2VuZUlkIjozLCJ0b1NjZW5lSWQiOjEsImRpc3BsYXlUZXh0IjoiUmV0dXJuIHRvIHRoZSBIYWxsd2F5IiwiZmxhZ1JlZmVyZW5jZXMiOltdfV0sImZsYWdzIjpbeyJpZCI6MSwic2NlbmVJZCI6MywibmFtZSI6IkZsYWcgMiIsImlzU2V0IjpmYWxzZX1dfSx7ImlkIjo0LCJoZWFkZXIiOiJBIFJlZCBSb29tIiwiZGVzY3JpcHRpb24iOiJBIHNpZ24gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcm9vbSBzYXlzIFwiWW91IHdpbiFcIiIsImltYWdlVXJsIjoiIiwibGlua3MiOltdLCJmbGFncyI6W119XX0=');
      /* tslint:enable:max-line-length */

      service.startGame();

      service.loadNextScene(2);

      const nextScene = service.getCurrentScene();

      expect(nextScene).toBeTruthy();
      expect(nextScene.id).toBe(2);
    }));

  it('should set all flags on the specified scene',
    inject([SceneService], (service: SceneService) => {
      service['scenes'] = [
        new SceneModel(
          1,
          'Test',
          'Test',
          null,
          new Array<LinkModel>(),
          [
            new FlagModel(1, 1, 'Test', false),
            new FlagModel(2, 1, 'Test', false)
          ]
        )
      ];

      service.setFlagsForScene(1);

      service['scenes'][0].flags.map(flag => {
        expect(flag.isSet).toBeTruthy();
      });
    }));

  it('should return true when all flags for a link are set',
    inject([SceneService], (service: SceneService) => {
      service['scenes'] = [
        new SceneModel(
          1,
          'Test',
          'Test',
          null,
          new Array<LinkModel>(),
          [
            new FlagModel(1, 1, 'Test', true),
            new FlagModel(2, 1, 'Test', true)
          ]
        ),
        new SceneModel(
          2,
          'Test',
          'Test',
          null,
          [
            new LinkModel(2, 1, 'Test', [
              new FlagReferenceModel(1, 1),
              new FlagReferenceModel(2, 1)
            ])
          ],
          [
            new FlagModel(1, 1, 'Test', false),
            new FlagModel(2, 1, 'Test', false)
          ]
        )
      ];

      expect(service.allFlagsSetForLink(
        new LinkModel(2, 1, 'Test', [
          new FlagReferenceModel(1, 1),
          new FlagReferenceModel(2, 1)
        ]))).toBeTruthy();
    }));

  it('should return false if any flags for the link are not set',
    inject([SceneService], (service: SceneService) => {
      service['scenes'] = [
        new SceneModel(
          1,
          'Test',
          'Test',
          null,
          new Array<LinkModel>(),
          [
            new FlagModel(1, 1, 'Test', true),
            new FlagModel(2, 1, 'Test', false)
          ]
        ),
        new SceneModel(
          2,
          'Test',
          'Test',
          null,
          [
            new LinkModel(2, 1, 'Test', [
              new FlagReferenceModel(1, 1),
              new FlagReferenceModel(2, 1)
            ])
          ],
          [
            new FlagModel(1, 1, 'Test', false),
            new FlagModel(2, 1, 'Test', false)
          ]
        )
      ];

      expect(service.allFlagsSetForLink(
        new LinkModel(2, 1, 'Test', [
          new FlagReferenceModel(1, 1),
          new FlagReferenceModel(2, 1)
        ]))).toBeFalsy();
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
