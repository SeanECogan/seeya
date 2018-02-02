import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { GeneratorModule } from '../generator.module';

import { AddSceneComponent } from './add-scene.component';
import { Observable } from 'rxjs/Observable';

describe('AddSceneComponent', () => {
  let component: AddSceneComponent;
  let fixture: ComponentFixture<AddSceneComponent>;
  let fakeMatDialog: MatDialog;
  let addButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [ { provide: MatDialog, useValue: {
        open: (a, b) => {}
      }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceneComponent);
    component = fixture.componentInstance;

    fakeMatDialog = TestBed.get(MatDialog);

    fixture.detectChanges();

    addButton = fixture.debugElement.query(By.css('#add-scene-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have an add button', () => {
    expect(addButton).toBeTruthy();
  });

  it ('should open the Add/Edit Scene dialog after the Add Scene button is clicked', () => {
    spyOn(fakeMatDialog, 'open').and.returnValue({
      afterClosed: () => {
        return new Observable<any>(() => {});
      }
    });

    addButton.triggerEventHandler('click', null);

    expect(fakeMatDialog.open).toHaveBeenCalled();
  });
});
