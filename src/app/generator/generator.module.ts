import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SceneService } from './scene/scene.service';

import { GeneratorComponent } from './generator.component';
import { SceneComponent } from './scene/scene.component';
import { AddSceneComponent } from './add-scene/add-scene.component';
import { ExportGameComponent } from './export-game/export-game.component';
import { ExportGameDialogComponent } from './export-game-dialog/export-game-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    SharedModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ClipboardModule
  ],
  declarations: [
    GeneratorComponent,
    SceneComponent,
    AddSceneComponent,
    ExportGameComponent,
    ExportGameDialogComponent
  ],
  entryComponents: [
    ExportGameDialogComponent
  ],
  providers: [
    SceneService
  ],
  exports: [
    GeneratorComponent
  ]
})
export class GeneratorModule { }
