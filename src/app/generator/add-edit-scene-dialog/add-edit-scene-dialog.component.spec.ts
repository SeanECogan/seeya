import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { AddEditSceneDialogComponent } from './add-edit-scene-dialog.component';

describe('AddEditSceneDialogComponent', () => {
  let component: AddEditSceneDialogComponent;
  let fixture: ComponentFixture<AddEditSceneDialogComponent>;
  let fakeSceneService: SceneService;
  let fakeMatDialog: MatDialog;
  let header: DebugElement;
  let addButton: DebugElement;
  let editButton: DebugElement;
  let cancelButton: DebugElement;
  let headerInput: DebugElement;
  let descriptionTextarea: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: SceneService, useValue: {} },
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
    addButton = fixture.debugElement.query(By.css('#add-scene-button'));
    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));
    cancelButton = fixture.debugElement.query(By.css('#cancel-button'));
    headerInput = fixture.debugElement.query(By.css('#header-input'));
    descriptionTextarea = fixture.debugElement.query(By.css('#description-textarea'));
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

  it ('should have the add button disabled when input is header and description are invalid', () => {
    component.editMode = false;
    component.newSceneHeader = '';
    component.newSceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when header is invalid', () => {
    component.editMode = false;
    component.newSceneHeader = '';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when description is invalid', () => {
    component.editMode = false;
    component.newSceneHeader = 'Test';
    component.newSceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button enabled when input is valid', () => {
    component.editMode = false;
    component.newSceneHeader = 'Test';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it ('should have the edit button disabled when input is header and description are invalid', () => {
    component.editMode = true;
    component.newSceneHeader = '';
    component.newSceneDescription = '';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button disabled when header is invalid', () => {
    component.editMode = true;
    component.newSceneHeader = '';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button disabled when description is invalid', () => {
    component.editMode = true;
    component.newSceneHeader = 'Test';
    component.newSceneDescription = '';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the edit button enabled when input is valid', () => {
    component.editMode = true;
    component.newSceneHeader = 'Test';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    editButton = fixture.debugElement.query(By.css('#edit-scene-button'));

    expect(editButton.attributes['ng-reflect-disabled']).toBe('false');
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

  it ('should call the SceneService AddScene method when the first scene is added', () => {
    fakeSceneService.addScene = () => {};
    fakeSceneService.getNumberOfScenes = () => 0;

    spyOn(fakeSceneService, 'addScene');

    component.addScene();

    expect(fakeSceneService.addScene).toHaveBeenCalled();
  });

  it ('should call the SceneService AddSceneWithLink method when scenes after the first are added', () => {
    fakeSceneService.addSceneWithLink = () => {};
    fakeSceneService.getNumberOfScenes = () => 1;

    spyOn(fakeSceneService, 'addSceneWithLink');

    spyOn(fakeMatDialog, 'open').and.returnValue({
      afterClosed: function() {
        // This feels gross. Come back to this when you have a better
        // understanding of how to test things with MatDialog. I guess this
        // works well enough for now.
        return new Observable<any>(() => {
          fakeSceneService.addSceneWithLink('', '', '');
        });
      }
    });

    component.addScene();

    expect(fakeSceneService.addSceneWithLink).toHaveBeenCalled();
  });

  it ('should call the SceneService EditScene method when a scene is edited', () => {
    fakeSceneService.editScene = () => {};

    spyOn(fakeSceneService, 'editScene');

    component.editScene();

    expect(fakeSceneService.editScene).toHaveBeenCalled();
  });
});
