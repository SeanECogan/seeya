import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { RunnerModule } from '../runner.module';

import { SceneComponent } from './scene.component';

import { SceneModel } from '../../shared/models/scene-model';
import { By } from '@angular/platform-browser';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;
  let headline: DebugElement;
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
    component.scene = new SceneModel(1, 'Header', 'Description', null);

    fixture.detectChanges();

    headline = fixture.debugElement.query(By.css('.mat-headline'));
    body = fixture.debugElement.query(By.css('.mat-body-1'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the scene header in the headline', () => {
    expect(headline.nativeElement.innerText).toBe('Header');
  });

  it('should display the scene description in the body', () => {
    expect(body.nativeElement.innerText).toBeTruthy('Description');
  });
});
