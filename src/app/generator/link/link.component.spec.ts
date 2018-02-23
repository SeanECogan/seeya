import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { GeneratorModule } from '../generator.module';

import { SceneService } from '../scene/scene.service';

import { LinkComponent } from './link.component';

import { LinkModel } from '../../shared/models/link-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let fakeMatDialog: MatDialog;
  let linkText: DebugElement;
  let editButton: DebugElement;
  let deleteButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: MatDialog, useValue: {
          open: (a, b) => {}
        }},
        { provide: MAT_DIALOG_DATA, useValue: {
          editMode: false,
          fromSceneId: 1,
          linkedSceneIds: []
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;

    component.link = new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>());

    fakeMatDialog = TestBed.get(MatDialog);

    fixture.detectChanges();

    linkText = fixture.debugElement.query(By.css('#link-text'));
    editButton = fixture.debugElement.query(By.css('#edit-button'));
    deleteButton = fixture.debugElement.query(By.css('#delete-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Link properly', () => {
    component.link = new LinkModel(1, 2, 'Test', new Array<FlagReferenceModel>());

    fixture.detectChanges();

    expect(linkText.nativeElement.innerText).toBe('Link to Scene #2 - "Test"');
  });

  it('should have an Edit Button', () => {
    expect(editButton).toBeTruthy();
  });

  it('should have a Delete Button', () => {
    expect(deleteButton).toBeTruthy();
  });

  it('should open the Add/Edit Link Dialog when the Edit button is clicked', () => {
    spyOn(fakeMatDialog, 'open').and.returnValue({
      afterClosed: () => {
        return new Observable<any>(() => {});
      }
    });

    editButton.triggerEventHandler('click', null);

    expect(fakeMatDialog.open).toHaveBeenCalled();
  });

  it('should emit the LinkRemovedEvent when the Delete Button is clicked', () => {
    spyOn(component.linkRemovedEvent, 'emit');

    deleteButton.triggerEventHandler('click', null);

    expect(component.linkRemovedEvent.emit).toHaveBeenCalled();
  });
});
