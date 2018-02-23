import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GeneratorModule } from '../generator.module';

import { FlagComponent } from './flag.component';
import { FlagModel } from '../../shared/models/flag-model';

describe('FlagComponent', () => {
  let component: FlagComponent;
  let fixture: ComponentFixture<FlagComponent>;
  let flagText: DebugElement;
  let deleteButton: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GeneratorModule ],
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagComponent);
    component = fixture.componentInstance;

    component.flag = new FlagModel(1, 1, 'Test', false);

    fixture.detectChanges();

    flagText = fixture.debugElement.query(By.css('#flag-text'));
    deleteButton = fixture.debugElement.query(By.css('#delete-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the Flag properly', () => {
    component.flag = new FlagModel(1, 1, 'Test', false);

    fixture.detectChanges();

    expect(flagText.nativeElement.innerText).toBe('Test');
  });

  it('should have a Delete Button', () => {
    expect(deleteButton).toBeTruthy();
  });

  it('should emit the FlagRemovedEvent when the Delete Button is clicked', () => {
    spyOn(component.flagRemovedEvent, 'emit');

    deleteButton.triggerEventHandler('click', null);

    expect(component.flagRemovedEvent.emit).toHaveBeenCalled();
  });
});
