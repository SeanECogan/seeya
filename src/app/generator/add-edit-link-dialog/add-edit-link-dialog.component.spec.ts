import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { AddEditLinkDialogComponent } from './add-edit-link-dialog.component';
import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';
import { FlagModel } from '../../shared/models/flag-model';

describe('AddEditLinkDialogComponent', () => {
  let component: AddEditLinkDialogComponent;
  let fixture: ComponentFixture<AddEditLinkDialogComponent>;
  let fakeSceneService: SceneService;
  let title: DebugElement;
  let saveButton: DebugElement;
  let sceneSelect: DebugElement;
  let requiredFlagsSelect: DebugElement;
  let flagOptions: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: SceneService, useValue: {
          getScenes: () => [],
          getAllFlags: () => []
        } },
        { provide: MatDialogRef, useValue: { } },
        { provide: MAT_DIALOG_DATA, useValue: { } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLinkDialogComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    title = fixture.debugElement.query(By.css('h2'));
    saveButton = fixture.debugElement.query(By.css('#save-button'));
    sceneSelect = fixture.debugElement.query(By.css('#scene-select'));
    requiredFlagsSelect = fixture.debugElement.query(By.css('#required-flags-select'));
    flagOptions = fixture.debugElement.queryAll(By.css('.flag-option'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title say Add Link when not in Edit Mode', () => {
    component.editMode = false;

    fixture.detectChanges();

    expect(title.nativeElement.innerText).toBe('Add Link');
  });

  it('should have the title say Edit Link when in Edit Mode', () => {
    component.editMode = true;

    fixture.detectChanges();

    expect(title.nativeElement.innerText).toBe('Edit Link');
  });

  it('should have the Scene Select when not in Edit Mode', () => {
    component.editMode = false;

    fixture.detectChanges();

    sceneSelect = fixture.debugElement.query(By.css('#scene-select'));

    expect(sceneSelect).toBeTruthy();
  });

  it('should not have the Scene Select when in Edit Mode', () => {
    component.editMode = true;

    fixture.detectChanges();

    sceneSelect = fixture.debugElement.query(By.css('#scene-select'));

    expect(sceneSelect).toBeFalsy();
  });

  it('should have the Required Flags Select', () => {
    fixture.detectChanges();

    requiredFlagsSelect = fixture.debugElement.query(By.css('#required-flags-select'));

    expect(requiredFlagsSelect).toBeTruthy();
  });

  it('should have use all flags that are returned from the service', () => {
    fakeSceneService.getAllFlags = () => {
      return [
        new FlagModel(1, 1, 'Test', false),
        new FlagModel(2, 1, 'Test', false),
        new FlagModel(3, 1, 'Test', false)
      ];
    };

    expect(component.getAllFlags().length).toBe(3);
  });

  it('should disable the Save button when there is nothing in the textbox and no scene is selected', () => {
    component.displayText = '';
    component.fromSceneId = 1;
    component.toSceneId = 0;

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should disable the Save button when there is something in the textbox and no scene is selected', () => {
    component.displayText = 'Test';
    component.fromSceneId = 1;
    component.toSceneId = 0;

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should disable the Save button when there is nothing in the textbox and a scene is selected', () => {
    component.displayText = '';
    component.fromSceneId = 1;
    component.toSceneId = 2;

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should enable the Save button when there is something in the textbox and a scene is selected', () => {
    component.displayText = 'Test';
    component.fromSceneId = 1;
    component.toSceneId = 2;

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it('should filter out the current Scene and any previously linked Scenes from the select', () => {
    component.displayText = '';
    component.fromSceneId = 1;
    component['linkedSceneIds'] = [
      2,
      3
    ];

    fakeSceneService.getScenes = () => {
      return [
        new SceneModel(1, 'Test1', 'Test1', '', [
          new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>()),
          new LinkModel(1, 3, 'Test', new Array<FlagReferenceModel>())
        ], new Array<FlagModel>()),
        new SceneModel(2, 'Test2', 'Test2', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(3, 'Test3', 'Test3', '', new Array<LinkModel>(), new Array<FlagModel>()),
        new SceneModel(4, 'Test4', 'Test4', '', new Array<LinkModel>(), new Array<FlagModel>())
      ];
    };

    fixture.detectChanges();

    const unlinkedScenes = component.getUnlinkedScenes();

    expect(unlinkedScenes.length).toBe(1, 'Number of Scenes');
    expect(unlinkedScenes[0].id).toBe(4, 'Scene Id');
    expect(unlinkedScenes[0].header).toBe('Test4', 'Scene Header');
    expect(unlinkedScenes[0].description).toBe('Test4', 'Scene Description');
    expect(unlinkedScenes[0].links.length).toBe(0, 'Scene Number of Links');
  });
});
