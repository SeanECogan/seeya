import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SceneService } from '../scene/scene.service';

import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';
import { SceneModel } from '../../shared/models/scene-model';

@Component({
  selector: 'seeya-add-edit-scene-dialog',
  templateUrl: './add-edit-scene-dialog.component.html',
  styleUrls: ['./add-edit-scene-dialog.component.css']
})
export class AddEditSceneDialogComponent implements OnInit {
  editMode: boolean;
  editSceneId: number;
  editedScene: SceneModel;

  newSceneHeader: string;
  newSceneDescription: string;

  constructor(
    public dialogRef: MatDialogRef<AddLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private sceneService: SceneService) {
      this.editMode = data.editMode;

      if (this.editMode) {
        this.editSceneId = data.sceneId;
        this.newSceneHeader = data.sceneHeader;
        this.newSceneDescription = data.sceneDescription;
      } else {
        this.newSceneHeader = '';
        this.newSceneDescription = '';
      }
  }

  ngOnInit() {
  }

  addScene(): void {
    if (this.sceneService.getNumberOfScenes() === 0) {
      this.sceneService.addScene(
        this.newSceneHeader,
        this.newSceneDescription
      );

      this.dialogRef.close();
    } else {
      const dialogRef = this.dialog.open(AddLinkDialogComponent, {
        width: '440px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(linkDisplayText => {
        this.sceneService.addSceneWithLink(
          this.newSceneHeader,
          this.newSceneDescription,
          linkDisplayText
        );

        this.dialogRef.close();
      });
    }
  }

  editScene(): void {
    this.sceneService.editScene(this.editSceneId, this.newSceneHeader, this.newSceneDescription);
    this.dialogRef.close();
  }

  inputIsValid(): boolean {
    return this.newSceneHeader !== '' && this.newSceneDescription !== '';
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
