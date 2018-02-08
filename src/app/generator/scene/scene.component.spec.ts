import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { GeneratorModule } from '../generator.module';

import { SceneService } from './scene.service';

import { SceneComponent } from './scene.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;
  let fakeSceneService: SceneService;
  let fakeMatDialog: MatDialog;
  let card: DebugElement;
  let cardTitle: DebugElement;
  let cardSubtitle: DebugElement;
  let starIcon: DebugElement;
  let imageContainer: DebugElement;
  let cardContent: DebugElement;
  let editButton: DebugElement;
  let deleteButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [
        { provide: SceneService, useValue: {
          getInitialSceneId: () => -1
        } },
        { provide: MatDialog, useValue: {
          open: (a, b) => {}
        }}
      ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneComponent);
    component = fixture.componentInstance;

    component.scene = new SceneModel(
      1,
      'Header',
      'Description',
      '',
      new Array<LinkModel>()
    );

    fakeSceneService = TestBed.get(SceneService);
    fakeMatDialog = TestBed.get(MatDialog);

    fixture.detectChanges();

    card = fixture.debugElement.query(By.css('#card'));
    cardTitle = fixture.debugElement.query(By.css('#card-title'));
    cardSubtitle = fixture.debugElement.query(By.css('#card-subtitle'));
    starIcon = fixture.debugElement.query(By.css('#star-icon'));
    imageContainer = fixture.debugElement.query(By.css('.image-container'));
    cardContent = fixture.debugElement.query(By.css('#card-content'));
    editButton = fixture.debugElement.query(By.css('#edit-button'));
    deleteButton = fixture.debugElement.query(By.css('#delete-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have the start-scene class if the scene is not the start scene', () => {
    component.scene.id = 1;

    fakeSceneService.getInitialSceneId = () => 2;

    fixture.detectChanges();

    expect(card.classes['start-scene']).toBeFalsy();
  });

  it('should have the start-scene class if the scene is the start scene', () => {
    component.scene.id = 1;

    fakeSceneService.getInitialSceneId = () => 1;

    fixture.detectChanges();

    expect(card.classes['start-scene']).toBeTruthy();
  });

  it('should display the scene ID and header in the card title', () => {
    expect(cardTitle.nativeElement.innerText).toBe('Scene #1: Header');
  });

  it('should not have a subtitle if there is no linked scene', () => {
    expect(cardSubtitle).toBeFalsy();
  });

  it('should have a subtitle if there is at least one linked scene', () => {
    component.scene.links = [new LinkModel(
      1,
      2,
      'Test'
    )];

    fixture.detectChanges();

    expect(cardSubtitle).toBeFalsy();
  });

  it('should not have a star icon if the scene is not the start scene', () => {
    component.scene.id = 1;

    fakeSceneService.getInitialSceneId = () => 2;

    fixture.detectChanges();

    starIcon = fixture.debugElement.query(By.css('#star-icon'));

    expect(starIcon).toBeFalsy();
  });

  it('should have a star icon if the scene is the start scene', () => {
    component.scene.id = 1;

    fakeSceneService.getInitialSceneId = () => 1;

    fixture.detectChanges();

    starIcon = fixture.debugElement.query(By.css('#star-icon'));

    expect(starIcon).toBeTruthy();
  });

  it('should not have an image container if the scene has no image', () => {
    component.scene.imageData = '';

    fixture.detectChanges();

    imageContainer = fixture.debugElement.query(By.css('.image-container'));

    expect(imageContainer).toBeFalsy();
  });

  it('should have an image container if the scene has an image', () => {
    component.scene.imageData = 'Test';

    fixture.detectChanges();

    imageContainer = fixture.debugElement.query(By.css('.image-container'));

    expect(imageContainer).toBeTruthy();
  });

  it('should display the scene description in the card content', () => {
    expect(cardContent.nativeElement.innerText).toBe('Description');
  });

  it('should open the Add/Edit Scene Dialog when the Edit button is clicked', () => {
    spyOn(fakeMatDialog, 'open').and.returnValue({
      afterClosed: () => {
        return new Observable<any>(() => {});
      }
    });

    editButton.triggerEventHandler('click', null);

    expect(fakeMatDialog.open).toHaveBeenCalled();
  });

  it('should call the scene service delete method when the delete icon button is clicked', () => {
    fakeSceneService.deleteScene = () => {};

    spyOn(fakeSceneService, 'deleteScene');

    deleteButton.triggerEventHandler('click', null);

    expect(fakeSceneService.deleteScene).toHaveBeenCalled();
  });
});
