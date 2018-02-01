import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { GeneratorModule } from '../generator.module';

import { AddSceneComponent } from './add-scene.component';

describe('AddSceneComponent', () => {
  let component: AddSceneComponent;
  let fixture: ComponentFixture<AddSceneComponent>;
  let addButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceneComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    addButton = fixture.debugElement.query(By.css('#add-scene-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have an add button', () => {
    expect(addButton).toBeTruthy();
  });
});
