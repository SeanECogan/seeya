import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { ImportExportGameComponent } from './import-export-game.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

describe('ImportExportGameComponent', () => {
  let component: ImportExportGameComponent;
  let fixture: ComponentFixture<ImportExportGameComponent>;
  let fakeSceneService: SceneService;
  let importButton: DebugElement;
  let exportButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [
        { provide: SceneService, useValue: {
          getNumberOfScenes: () => {}
        } }],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportGameComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    importButton = fixture.debugElement.query(By.css('#import-button'));
    exportButton = fixture.debugElement.query(By.css('#export-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Import button', () => {
    expect(importButton).toBeTruthy();
  });

  it('should have the Export button disabled if there are no scenes and the game does not have a start scene', () => {
    fakeSceneService.getNumberOfScenes = () => 0;
    fakeSceneService.getInitialSceneId = () => -1;
    fakeSceneService.getScenes = () => [];

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should have the Export button disabled if there are no scenes and the game does have a start scene', () => {
    fakeSceneService.getNumberOfScenes = () => 0;
    fakeSceneService.getInitialSceneId = () => 1;
    fakeSceneService.getScenes = () => [];

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should have the Export button disabled if there are scenes and the game does not have a start scene', () => {
    fakeSceneService.getNumberOfScenes = () => 1;
    fakeSceneService.getInitialSceneId = () => -1;
    fakeSceneService.getScenes = () => [
      new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>())
    ];

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should have the Export button enabled if there is at least one scene and the game has a start scene', () => {
    fakeSceneService.getNumberOfScenes = () => 1;
    fakeSceneService.getInitialSceneId = () => 1;
    fakeSceneService.getScenes = () => [
      new SceneModel(1, 'Test', 'Test', '', new Array<LinkModel>())
    ];

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('false');
  });
});
