import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RunnerModule } from '../runner.module';

import { SceneComponent } from './scene.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagModel } from '../../shared/models/flag-model';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;
  let headline: DebugElement;
  let imageContainer: DebugElement;
  let body: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RunnerModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneComponent);
    component = fixture.componentInstance;
    component.scene = new SceneModel(1, 'Header', 'Description', '', new Array<LinkModel>(), new Array<FlagModel>());

    fixture.detectChanges();

    headline = fixture.debugElement.query(By.css('.mat-headline'));
    imageContainer = fixture.debugElement.query(By.css('.image-container'));
    body = fixture.debugElement.query(By.css('.mat-body-1'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the scene header in the headline', () => {
    expect(headline.nativeElement.innerText).toBe('Header');
  });

  it('should not display the image container if the scene has no image', () => {
    component.scene.imageUrl = '';

    fixture.detectChanges();

    imageContainer = fixture.debugElement.query(By.css('.image-container'));

    expect(imageContainer).toBeFalsy();
  });

  it('should display the image container if the scene has an image', () => {
    component.scene.imageUrl = 'Test';

    fixture.detectChanges();

    imageContainer = fixture.debugElement.query(By.css('.image-container'));

    expect(imageContainer).toBeTruthy();
  });

  it('should display the scene description in the body', () => {
    expect(body.nativeElement.innerText).toBe('Description');
  });
});
