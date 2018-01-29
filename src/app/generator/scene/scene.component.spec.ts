import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { SceneComponent } from './scene.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;
  let cardTitle: DebugElement;
  let cardSubtitle: DebugElement;
  let cardContent: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
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
      null
    );

    fixture.detectChanges();

    cardTitle = fixture.debugElement.query(By.css("#card-title"));
    cardSubtitle = fixture.debugElement.query(By.css("#card-subtitle"));
    cardContent = fixture.debugElement.query(By.css("#card-content"));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the scene ID and header in the card title', () => {
    expect(cardTitle.nativeElement.innerText).toBe('Scene #1: Header');
  });

  it('should not have a subtitle if there is no linked scene', () => {
    expect(cardSubtitle).toBeFalsy();
  });

  it('should have a subtitle if there is a linked scene', () => {
    component.scene.link = new LinkModel(
      1,
      2
    );

    fixture.detectChanges();

    expect(cardSubtitle).toBeFalsy();
  });

  it('should display the scene description in the card content', () => {
    expect(cardContent.nativeElement.innerText).toBe('Description');
  });
});
