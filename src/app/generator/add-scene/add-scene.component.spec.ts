import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { AddSceneComponent } from './add-scene.component';
import { SceneService } from '../scene/scene.service';

describe('AddSceneComponent', () => {
  let component: AddSceneComponent;
  let fixture: ComponentFixture<AddSceneComponent>;
  let fakeSceneService: SceneService;
  let addButton: DebugElement;
  let headerInput: DebugElement;
  let descriptionTextarea: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      providers: [{ provide: SceneService, useValue: {} }],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceneComponent);
    component = fixture.componentInstance;

    fakeSceneService = TestBed.get(SceneService);

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

    component.newSceneHeader = 'Test';
    component.newSceneDescription = 'Test';

    fixture.detectChanges();

    component.addScene();

    fixture.detectChanges();

    expect(component.newSceneHeader).toBeFalsy();
    expect(component.newSceneDescription).toBeFalsy();
  });

  it ('should call the SceneService add method when a scene is added', () => {
    fakeSceneService.addScene = () => {};

    spyOn(fakeSceneService, 'addScene');

    component.addScene();

    expect(fakeSceneService.addScene).toHaveBeenCalled();
  });
});
