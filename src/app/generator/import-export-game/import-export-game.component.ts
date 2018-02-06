import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { SceneService } from '../scene/scene.service';
import { ExportGameDialogComponent } from '../export-game-dialog/export-game-dialog.component';
import { ImportGameDialogComponent } from '../import-game-dialog/import-game-dialog.component';

@Component({
  selector: 'seeya-import-export-game',
  templateUrl: './import-export-game.component.html',
  styleUrls: ['./import-export-game.component.css']
})
export class ImportExportGameComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService) { }

  ngOnInit() {
  }

  gameHasAnyScenes(): boolean {
    return this.sceneService.getNumberOfScenes() > 0;
  }

  gameHasStartScene(): boolean {
    const scenes = this.sceneService.getScenes();

    return scenes.some(s => s.id === this.sceneService.getInitialSceneId());
  }

  importGame(): void {
    this.dialog.open(ImportGameDialogComponent, {
      width: '440px'
    });
  }

  exportGame(): void {
    this.dialog.open(ExportGameDialogComponent, {
      width: '440px',
      data: { exportedGame: this.sceneService.exportGame() }
    });
  }
}
