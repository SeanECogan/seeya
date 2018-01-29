import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DebugElement } from '@angular/core';

import { GeneratorModule } from '../generator.module';

import { ExportGameDialogComponent } from './export-game-dialog.component';
import { By } from '@angular/platform-browser';

describe('ExportGameDialogComponent', () => {
  let component: ExportGameDialogComponent;
  let fixture: ComponentFixture<ExportGameDialogComponent>;
  let copyButton: DebugElement;
  let exportedGameTextArea: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {
          exportedGame: "Test"
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGameDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    copyButton = fixture.debugElement.query(By.css("#copy-button"));
    exportedGameTextArea = fixture.debugElement.query(By.css("#exported-game-textarea"));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the copy button say "Copy to Clipboard" by default', () => {
    expect(copyButton.nativeElement.innerText).toBe("Copy to Clipboard");
  });

  it('should have the copy button not have the copy-success class by default', () => {
    expect(copyButton.classes["copy-success"]).toBeFalsy();
  });

  it('should have the copy button say "Copy Successful!" after being clicked', () => {
    copyButton.triggerEventHandler('cbOnSuccess', null);

    fixture.detectChanges();
    
    expect(copyButton.nativeElement.innerText).toBe("Copy Successful!");
  });

  it('should have the copy button have the copy-success class after being clicked', () => {
    copyButton.triggerEventHandler('cbOnSuccess', null);

    fixture.detectChanges();

    expect(copyButton.classes["copy-success"]).toBeTruthy();
  });

  it('should have the exported game data in the textarea', () => {
    expect(exportedGameTextArea.nativeElement.value).toBe('Test');
  });
});
