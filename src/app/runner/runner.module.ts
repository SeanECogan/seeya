import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneService } from './scene/scene.service';

import { SharedModule } from '../shared/shared.module';
import { RunnerComponent } from './runner.component';
import { SceneComponent } from './scene/scene.component';
import { ImportGameComponent } from './import-game/import-game.component';
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { GameRunnerComponent } from './game-runner/game-runner.component';

@NgModule({
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    RunnerComponent, 
    SceneComponent, 
    ImportGameComponent, 
    ImportGameDialogComponent, GameRunnerComponent
  ],
  entryComponents: [
    ImportGameDialogComponent
  ],
  providers: [
    SceneService
  ],
  exports: [
    RunnerComponent
  ]
})
export class RunnerModule { }
