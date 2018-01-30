import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { GeneratorModule } from '../generator.module';

import { AddLinkDialogComponent } from './add-link-dialog.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddLinkDialogComponent', () => {
  let component: AddLinkDialogComponent;
  let fixture: ComponentFixture<AddLinkDialogComponent>;
  let okButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    okButton = fixture.debugElement.query(By.css('#ok-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the Ok button when there is nothing in the textbox', () => {
    component.linkDisplayText = '';

    fixture.detectChanges();

    expect(okButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should enable the Ok button when there is something in the textbox', () => {
    component.linkDisplayText = 'Test';

    fixture.detectChanges();

    expect(okButton.attributes['ng-reflect-disabled']).toBe('false');
  });
});
