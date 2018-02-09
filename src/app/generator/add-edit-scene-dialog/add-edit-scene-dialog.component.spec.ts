import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { AddEditSceneDialogComponent } from './add-edit-scene-dialog.component';

import { LinkModel } from '../../shared/models/link-model';

describe('AddEditSceneDialogComponent', () => {
  let component: AddEditSceneDialogComponent;
  let fixture: ComponentFixture<AddEditSceneDialogComponent>;
  let fakeSceneService: SceneService;
  let fakeMatDialog: MatDialog;
  let header: DebugElement;
  let setAsStartSceneButton: DebugElement;
  let addButton: DebugElement;
  let editButton: DebugElement;
  let cancelButton: DebugElement;
  let headerInput: DebugElement;
  let descriptionTextarea: DebugElement;
  let imageInput: DebugElement;
  let imagePreview: DebugElement;
  let linksSection: DebugElement;
  let links: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: SceneService, useValue: {
          getInitialSceneId: () => -1,
          getNextSceneId: () => 1,
          getNumberOfScenes: () => 0
        } },
        { provide: MatDialog, useValue: {
          open: (a, b) => {}
        }},
        { provide: MatDialogRef, useValue: {
          close: () => {}
        } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSceneDialogComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);
    fakeMatDialog = TestBed.get(MatDialog);

    fixture.detectChanges();

    header = fixture.debugElement.query(By.css('h2'));
    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));
    addButton = fixture.debugElement.query(By.css('#add-scene-button'));
    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));
    cancelButton = fixture.debugElement.query(By.css('#cancel-button'));
    headerInput = fixture.debugElement.query(By.css('#header-input'));
    descriptionTextarea = fixture.debugElement.query(By.css('#description-textarea'));
    imageInput = fixture.debugElement.query(By.css('#image-input'));
    imagePreview = fixture.debugElement.query(By.css('#image-preview'));
    linksSection = fixture.debugElement.query(By.css('#links-section'));
    links = fixture.debugElement.queryAll(By.css('.link'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say Add Scene when not in Edit Mode', () => {
    component.editMode = false;

    fixture.detectChanges();

    expect(header.nativeElement.innerText).toBe('Add Scene');
  });

  it('should say Edit Scene when in Edit Mode', () => {
    component.editMode = true;

    fixture.detectChanges();

    expect(header.nativeElement.innerText).toBe('Edit Scene');
  });

  it ('should not have the Set as Start Scene button when not in Edit Mode', () => {
    component.editMode = false;

    fixture.detectChanges();

    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));

    expect(setAsStartSceneButton).toBeFalsy();
  });

  it ('should have the Set as Start Scene button when in Edit Mode', () => {
    component.editMode = true;

    fixture.detectChanges();

    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));

    expect(setAsStartSceneButton).toBeTruthy();
  });

  it ('should have the Set as Start Scene button disabled when the current Scene is the Start Scene', () => {
    component.editMode = true;
    component.sceneId = 1;

    fakeSceneService.getInitialSceneId = () => 1;

    fixture.detectChanges();

    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));

    expect(setAsStartSceneButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the Set as Start Scene button enabled when the current Scene is not the Start Scene', () => {
    component.editMode = true;
    component.sceneId = 1;

    fakeSceneService.getInitialSceneId = () => 2;

    fixture.detectChanges();

    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));

    expect(setAsStartSceneButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should call the Scene Service setInitialSceneId method when the Set as Start Scene button is clicked', () => {
    component.editMode = true;
    component.sceneId = 1;

    fakeSceneService.setInitialSceneId = () => {};

    spyOn(fakeSceneService, 'setInitialSceneId');

    fixture.detectChanges();

    setAsStartSceneButton = fixture.debugElement.query(By.css('#set-as-start-scene-button'));

    setAsStartSceneButton.triggerEventHandler('click', null);

    expect(fakeSceneService.setInitialSceneId).toHaveBeenCalled();
  });

  it ('should have the add button disabled when input is header and description are invalid', () => {
    component.editMode = false;
    component.sceneHeader = '';
    component.sceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when header is invalid', () => {
    component.editMode = false;
    component.sceneHeader = '';
    component.sceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when description is invalid', () => {
    component.editMode = false;
    component.sceneHeader = 'Test';
    component.sceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button enabled when input is valid', () => {
    component.editMode = false;
    component.sceneHeader = 'Test';
    component.sceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it ('should have the edit button disabled when input is header and description are invalid', () => {
    component.editMode = true;
    component.sceneHeader = '';
    component.sceneDescription = '';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button disabled when header is invalid', () => {
    component.editMode = true;
    component.sceneHeader = '';
    component.sceneDescription = 'Test';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button disabled when description is invalid', () => {
    component.editMode = true;
    component.sceneHeader = 'Test';
    component.sceneDescription = '';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button enabled when input is valid', () => {
    component.editMode = true;
    component.sceneHeader = 'Test';
    component.sceneDescription = 'Test';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it ('should not display the Links section if this is the first scene', () => {
    fakeSceneService.getNumberOfScenes = () => 0;

    fixture.detectChanges();

    linksSection = fixture.debugElement.query(By.css('#links-section'));

    expect(linksSection).toBeFalsy();
  });

  it ('should display the Links section if there is at least one other scene', () => {
    fakeSceneService.getNumberOfScenes = () => 1;

    fixture.detectChanges();

    linksSection = fixture.debugElement.query(By.css('#links-section'));

    expect(linksSection).toBeTruthy();
  });

  it ('should display the Links for the Scene in the Links section', () => {
    fakeSceneService.getNumberOfScenes = () => 1;

    component.sceneId = 1;
    component.sceneLinks = [
      new LinkModel(1, 2, 'Test'),
      new LinkModel(1, 3, 'Test2')
    ];

    fixture.detectChanges();

    links = fixture.debugElement.queryAll(By.css('.link'));

    expect(links.length).toBe(2);
  });

  it ('should have a cancel button', () => {
    expect(cancelButton).toBeTruthy();
  });

  it ('should have a header input', () => {
    expect(headerInput).toBeTruthy();
  });

  it ('should have a description textarea', () => {
    expect(descriptionTextarea).toBeTruthy();
  });

  it ('should have an image input', () => {
    expect(imageInput).toBeTruthy();
  });

  it ('should not have an image preview if there is no image', () => {
    component.sceneImageUrl = '';

    fixture.detectChanges();

    imagePreview = fixture.debugElement.query(By.css('#image-preview'));

    expect(imagePreview).toBeFalsy();
  });

  it ('should have an image preview if there is an image', () => {
    component.sceneImageUrl = 'Test';

    fixture.detectChanges();

    imagePreview = fixture.debugElement.query(By.css('#image-preview'));

    expect(imagePreview).toBeTruthy();
  });

  it ('should call the SceneService AddScene method when a scene is added', () => {
    fakeSceneService.addScene = () => {};
    fakeSceneService.getNumberOfScenes = () => 0;

    spyOn(fakeSceneService, 'addScene');

    component.addScene();

    expect(fakeSceneService.addScene).toHaveBeenCalled();
  });

  it ('should call the SceneService EditScene method when a scene is edited', () => {
    fakeSceneService.editScene = () => {};

    spyOn(fakeSceneService, 'editScene');

    component.editScene();

    expect(fakeSceneService.editScene).toHaveBeenCalled();
  });

  it ('should open the Add/Edit Link dialog after the Add Link button is clicked', () => {
    spyOn(fakeMatDialog, 'open').and.returnValue({
      afterClosed: () => {
        return new Observable<any>(() => {});
      }
    });

    component.addLink();

    expect(fakeMatDialog.open).toHaveBeenCalled();
  });

  it ('should edit an existing link when running the LinkEditedEvent handler', () => {
    component.sceneLinks = [
      new LinkModel(1, 2, 'Test'),
      new LinkModel(1, 3, 'Test2')
    ];

    component.editLink(new LinkModel(1, 2, 'Test2'));

    expect(component.sceneLinks[0].displayText).toBe('Test2');
  });

  it ('should not edit an existing link when running the LinkEditedEvent handler if the link does not exist', () => {
    component.sceneLinks = [
      new LinkModel(1, 2, 'Test'),
      new LinkModel(1, 3, 'Test2')
    ];

    component.editLink(new LinkModel(1, 4, 'Test2'));

    expect(component.sceneLinks[0].displayText).toBe('Test');
    expect(component.sceneLinks[1].displayText).toBe('Test2');
  });

  it ('should delete an existing link when running the LinkRemovedEvent handler', () => {
    component.sceneLinks = [
      new LinkModel(1, 2, 'Test'),
      new LinkModel(1, 3, 'Test2')
    ];

    component.removeLink(2);

    expect(component.sceneLinks.length).toBe(1, 'Number of links');
    expect(component.sceneLinks[0].fromSceneId).toBe(1, 'Link From Scene Id');
    expect(component.sceneLinks[0].toSceneId).toBe(3, 'Link To Scene Id');
    expect(component.sceneLinks[0].displayText).toBe('Test2', 'Link Display Text');
  });

  it ('should not delete an existing link if the supplied link id does not exist', () => {
    component.sceneLinks = [
      new LinkModel(1, 2, 'Test'),
      new LinkModel(1, 3, 'Test2')
    ];

    component.removeLink(4);

    expect(component.sceneLinks.length).toBe(2, 'Number of links');
  });
});
