import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { GeneratorModule } from './generator/generator.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    GeneratorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
