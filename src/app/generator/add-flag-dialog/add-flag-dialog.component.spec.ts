import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { AddFlagDialogComponent } from './add-flag-dialog.component';

describe('AddFlagDialogComponent', () => {
  let component: AddFlagDialogComponent;
  let fixture: ComponentFixture<AddFlagDialogComponent>;
  let fakeSceneService: SceneService;
  let title: DebugElement;
  let saveButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: SceneService, useValue: {
          getNextFlagId: () => 1
        } },
        { provide: MatDialogRef, useValue: { } },
        { provide: MAT_DIALOG_DATA, useValue: { } }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlagDialogComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

    fixture.detectChanges();

    title = fixture.debugElement.query(By.css('h2'));
    saveButton = fixture.debugElement.query(By.css('#save-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title say Add Flag', () => {
    expect(title.nativeElement.innerText).toBe('Add Flag');
  });

  it('should disable the Save button when there is nothing in the textbox', () => {
    component.sceneId = 1;
    component.name = '';

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should enable the Save button when there is something in the textbox', () => {
    component.sceneId = 1;
    component.name = 'Test';

    fixture.detectChanges();

    expect(saveButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it('should use the next flag id from the service if no other flags have been added', () => {
    component.sceneId = 1;
    component.name = 'Test';
    component.previousMaxId = -1;

    fakeSceneService.getNextFlagId = () => 1;

    expect(component.getNextFlagId()).toBe(1);
  });

  it('should use the next previous max flag id if other scenes have been added', () => {
    component.sceneId = 1;
    component.name = 'Test';
    component.previousMaxId = 2;

    fakeSceneService.getNextFlagId = () => 1;

    expect(component.getNextFlagId()).toBe(3);
  });
});
