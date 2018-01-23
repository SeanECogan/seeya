import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { GeneratorModule } from './generator/generator.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeModule } from './home/home.module';
import { RunnerModule } from './runner/runner.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    GeneratorModule,
    AppRoutingModule,
    HomeModule,
    RunnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
