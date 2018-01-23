import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SceneService } from './scene/scene.service';

import { GeneratorComponent } from './generator.component';
import { SceneComponent } from './scene/scene.component';
import { AddSceneComponent } from './add-scene/add-scene.component';

@NgModule({
  imports: [
    SharedModule
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
