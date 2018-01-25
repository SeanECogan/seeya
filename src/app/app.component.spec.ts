import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterModule, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatTabLink } from '@angular/material';

import { AppComponent } from './app.component';

import { RouterLinkStubDirective } from './testing/router-stubs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let tabDes: DebugElement[];
  let tabs: RouterLinkStubDirective[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        MatTabsModule
      ],
      declarations: [
        AppComponent,
        RouterLinkStubDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    tabDes = fixture.debugElement.queryAll(By.directive(MatTabLink))
    tabs = tabDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three tabs', () => {
    expect(tabs.length).toBe(3);
    expect(tabs[0].linkParams).toBe('./', '1st tab should be Home');
    expect(tabs[1].linkParams).toBe('generator', '2nd tab should be Generator');
    expect(tabs[2].linkParams).toBe('runner', '3rd tab should be Runner');
  });
});