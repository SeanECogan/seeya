import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { ExportGameComponent } from './export-game.component';

describe('ExportGameComponent', () => {
  let component: ExportGameComponent;
  let fixture: ComponentFixture<ExportGameComponent>;
  let fakeSceneService: SceneService;
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
    fixture = TestBed.createComponent(ExportGameComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    exportButton = fixture.debugElement.query(By.css('#export-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
