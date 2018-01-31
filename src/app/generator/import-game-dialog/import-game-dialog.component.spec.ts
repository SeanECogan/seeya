import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { ImportGameDialogComponent } from './import-game-dialog.component';

describe('ImportGameDialogComponent', () => {
  let component: ImportGameDialogComponent;
  let fixture: ComponentFixture<ImportGameDialogComponent>;
  let importButton: DebugElement;
  let errorMessages: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: MatDialogRef, useValue: {
          close: () => {}
        } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGameDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    importButton = fixture.debugElement.query(By.css('#import-button'));
    errorMessages = fixture.debugElement.queryAll(By.css('.error'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Import button disabled if there is no text in the textbox', () => {
    expect(importButton.attributes['ng-reflect-disabled']).toBe('true');
  });

  it('should have the Import button enabled if there is text in the textbox', () => {
    component.gameImportString = 'test';

    fixture.detectChanges();

    expect(importButton.attributes['ng-reflect-disabled']).toBe('false');
  });

  it('should display an error message if the string fails to import', () => {
    component.gameImportString = 'test';

    component.importGame();

    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error'));

    expect(errorMessages.length).toBe(2);
  });

  it('should not display any error messages if the string imports successfully', () => {
    /* tslint:disable:max-line-length */
    component.gameImportString = 'eyJpbml0aWFsU2NlbmVJZCI6NSwic2NlbmVzIjpbeyJpZCI6NSwiaGVhZGVyIjoiSGVhZGVyIiwiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiIsImxpbmsiOnsiZnJvbVNjZW5lSWQiOjUsInRvU2NlbmVJZCI6NiwiZGlzcGxheVRleHQiOiJEaXNwbGF5In19LHsiaWQiOjYsImhlYWRlciI6IkhlYWRlcjIiLCJkZXNjcmlwdGlvbiI6IkRlc2NyaXB0aW9uMiIsImxpbmsiOm51bGx9XX0=';
    /* tslint:enable:max-line-length */

    component.importGame();

    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error'));

    expect(errorMessages.length).toBe(0);
  });
});
