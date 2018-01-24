import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { SceneService } from '../scene/scene.service';
import { ExportGameDialogComponent } from '../export-game-dialog/export-game-dialog.component';

@Component({
  selector: 'seeya-export-game',
  templateUrl: './export-game.component.html',
  styleUrls: ['./export-game.component.css']
})
export class ExportGameComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService) { }

  ngOnInit() {
  }

  gameHasAnyScenes(): boolean {
    return this.sceneService.getNumberOfScenes() > 0;
  }

  exportGame(): void {
    this.dialog.open(ExportGameDialogComponent, {
      width: '440px',
      data: { exportedGame: this.sceneService.exportGame() }
    });
  }
}
