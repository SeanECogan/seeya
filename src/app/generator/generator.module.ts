import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatGridListModule } from '@angular/material';

import { ClipboardModule } from 'ngx-clipboard';

import { SceneService } from './scene/scene.service';

import { GeneratorComponent } from './generator.component';
import { SceneComponent } from './scene/scene.component';
import { AddSceneComponent } from './add-scene/add-scene.component';
import { ImportExportGameComponent } from './import-export-game/import-export-game.component';
import { ExportGameDialogComponent } from './export-game-dialog/export-game-dialog.component';
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component';
import { AddLinkDialogComponent } from './add-link-dialog/add-link-dialog.component';
import { AddEditSceneDialogComponent } from './add-edit-scene-dialog/add-edit-scene-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    ClipboardModule
  ],
  declarations: [
    GeneratorComponent,
    SceneComponent,
    AddSceneComponent,
    ImportExportGameComponent,
    ExportGameDialogComponent,
    ImportGameDialogComponent,
    AddLinkDialogComponent,
    AddEditSceneDialogComponent
  ],
  entryComponents: [
    ExportGameDialogComponent,
    ImportGameDialogComponent,
    AddEditSceneDialogComponent,
    AddLinkDialogComponent
  ],
  providers: [
    SceneService
  ],
  exports: [
    GeneratorComponent
  ]
})
export class GeneratorModule { }
