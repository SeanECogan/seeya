import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ObservableMedia, MediaService } from '@angular/flex-layout';

import { GeneratorModule } from './generator.module';

import { SceneService } from '../generator/scene/scene.service';

import { GeneratorComponent } from './generator.component';

import { SceneModel } from '../shared/models/scene-model';
import { LinkModel } from '../shared/models/link-model';
import { FlagModel } from '../shared/models/flag-model';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;
  let fakeSceneService: SceneService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [
        { provide: SceneService, useValue: {} },
        { provide: ObservableMedia, useValue: {
          subscribe: () => {}
        } },
        { provide: MediaService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show any scenes if no scenes are returned by the service', () => {
    fakeSceneService.getScenes = () => [];

    const scenes = component.getScenes();

    expect(scenes.length).toBe(0);
  });

  it('should use the scenes returned from the service', () => {
    // Setup mock SceneService.
    fakeSceneService.getScenes = () => {
      return [
        new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];
    };

    const scenes = component.getScenes();

    expect(scenes.length).toBe(1);
    expect(scenes[0].id).toBe(1);
    expect(scenes[0].header).toBe('Test');
    expect(scenes[0].description).toBe('Test');
    expect(scenes[0].links.length).toBe(0);
    expect(scenes[0].flags.length).toBe(0);
  });
});
