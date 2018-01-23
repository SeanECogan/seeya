import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SceneService } from './scene/scene.service';

import { GeneratorComponent } from './generator.component';
import { SceneComponent } from './scene/scene.component';
import { AddSceneComponent } from './add-scene/add-scene.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    GeneratorComponent,
    SceneComponent,
    AddSceneComponent
  ],
  providers: [
    SceneService
  ],
  exports: [
    GeneratorComponent
  ]
})
export class GeneratorModule { }
