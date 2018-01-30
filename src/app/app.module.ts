import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './/app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { GeneratorModule } from './generator/generator.module';
import { RunnerModule } from './runner/runner.module';

import { AppComponent } from './app.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    GeneratorModule,
    RunnerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
