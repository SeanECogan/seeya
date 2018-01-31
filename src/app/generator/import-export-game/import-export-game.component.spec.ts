import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { ImportExportGameComponent } from './import-export-game.component';

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

  it('should have the Export button disabled if there are no scenes', () => {
    fakeSceneService.getNumberOfScenes = () => 0;

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should have the Export button enabled if there is at least one scene', () => {
    fakeSceneService.getNumberOfScenes = () => 1;

    fixture.detectChanges();

    expect(exportButton.attributes['ng-reflect-disabled']).toBe('false');
  });
});
