import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SceneService } from '../scene/scene.service';

@Component({
  selector: 'seeya-import-game-dialog',
  templateUrl: './import-game-dialog.component.html',
  styleUrls: ['./import-game-dialog.component.css']
})
export class ImportGameDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImportGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sceneService: SceneService) { 
    this.gameImportString = "";
    this.gameImportSuccessful = true;
  }

  ngOnInit() {
  }

  importGame() {
    this.gameImportSuccessful = true;
    
    try {
      this.sceneService.importGame(this.gameImportString);
      this.dialogRef.close();
    } catch {
      this.gameImportSuccessful = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gameImportString: string;
  gameImportSuccessful: boolean;
}
