import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorModule } from './generator.module';

import { SceneService } from '../generator/scene/scene.service';

import { GeneratorComponent } from './generator.component';

import { SceneModel } from '../shared/models/scene-model';
import { By } from '@angular/platform-browser';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;
  let fakeSceneService: SceneService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [{ provide: SceneService, useValue: {} }]
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
    // Setup mock SceneService.
    fakeSceneService.getScenes = () => [];

    component.getScenes();

    expect(component.scenes.length).toBe(0);
  });

  it('should set scenes to the scenes returned from the service', () => {
    // Setup mock SceneService.
    fakeSceneService.getScenes = () => {
      return [
        new SceneModel(1, 'Test', 'Test', null)
      ];
    };

    component.getScenes();

    expect(component.scenes.length).toBe(1);
    expect(component.scenes[0].id).toBe(1);
    expect(component.scenes[0].header).toBe('Test');
    expect(component.scenes[0].description).toBe('Test');
    expect(component.scenes[0].link).toBe(null);
  });
});
