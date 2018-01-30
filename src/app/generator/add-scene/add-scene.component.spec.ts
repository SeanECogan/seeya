import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { AddSceneComponent } from './add-scene.component';
import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';
import { Observable } from 'rxjs/Observable';

describe('AddSceneComponent', () => {
  let component: AddSceneComponent;
  let fixture: ComponentFixture<AddSceneComponent>;
  let fakeSceneService: SceneService;
  let fakeMatDialog: MatDialog;
  let addButton: DebugElement;
  let headerInput: DebugElement;
  let descriptionTextarea: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [
        { provide: SceneService, useValue: {} },
        { provide: MatDialog, useValue: {
          open: (a, b) => {}
        }}
      ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceneComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);
    fakeMatDialog = TestBed.get(MatDialog);

    fixture.detectChanges();

    addButton = fixture.debugElement.query(By.css('#add-scene-button'));
    headerInput = fixture.debugElement.query(By.css('#header-input'));
    descriptionTextarea = fixture.debugElement.query(By.css('#description-textarea'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have an add button', () => {
    expect(addButton).toBeTruthy();
  });

  it ('should have the add button disabled when input is header and description are invalid', () => {
    component.newSceneHeader = '';
    component.newSceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when header is invalid', () => {
    component.newSceneHeader = '';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button disabled when description is invalid', () => {
    component.newSceneHeader = 'Test';
    component.newSceneDescription = '';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it ('should have the add button enabled when input is valid', () => {
    component.newSceneHeader = 'Test';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    expect(addButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it ('should have a header input', () => {
    expect(headerInput).toBeTruthy();
  });

  it ('should have a description textarea', () => {
    expect(descriptionTextarea).toBeTruthy();
  });

  it ('should reset the header and description inputs when a scene is added', () => {
    fakeSceneService.addScene = () => {};
    fakeSceneService.getNumberOfScenes = () => 0;

    component.newSceneHeader = 'Test';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    component.addScene();

    fixture.detectChanges();

    expect(component.newSceneHeader).toBeFalsy();
    expect(component.newSceneDescription).toBeFalsy();
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
});
