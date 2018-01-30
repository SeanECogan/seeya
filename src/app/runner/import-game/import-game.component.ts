import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { SceneService } from '../scene/scene.service';

import { ImportGameDialogComponent } from '../import-game-dialog/import-game-dialog.component';

@Component({
  selector: 'seeya-import-game',
  templateUrl: './import-game.component.html',
  styleUrls: ['./import-game.component.css']
})
export class ImportGameComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService) { }

  ngOnInit() {
  }

  importGame(): void {
    const dialogRef = this.dialog.open(ImportGameDialogComponent, {
      width: '440px'
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.sceneService.getNumberOfScenes() > 0) {
        this.sceneService.startGame();
      }
    });
  }

  gameIsFinished(): boolean {
    return this.sceneService.gameIsFinished();
  }

  gameIsLoaded(): boolean {
    return this.sceneService.getCurrentScene() != null;
  }
}
