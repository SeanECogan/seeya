import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SceneService } from '../scene/scene.service';

import { LinkFactory } from '../../shared/factories/link-factory';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

@Component({
  selector: 'seeya-add-edit-link-dialog',
  templateUrl: './add-edit-link-dialog.component.html',
  styleUrls: ['./add-edit-link-dialog.component.css']
})
export class AddEditLinkDialogComponent implements OnInit {
  lf: LinkFactory;

  displayText: string;
  toSceneId: number;
  fromSceneId: number;

  editMode: boolean;

  private linkedSceneIds: number[];

  constructor(
    public sceneService: SceneService,
    public dialogRef: MatDialogRef<AddEditLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.lf = new LinkFactory();

      this.editMode = data.editMode;

      if (this.editMode) {
        this.toSceneId = data.link.toSceneId;
        this.fromSceneId = data.link.fromSceneId;
        this.displayText = data.link.displayText;
      } else {
        this.displayText = '';
        this.fromSceneId = data.fromSceneId;

        this.linkedSceneIds = data.linkedSceneIds;
      }
    }

  ngOnInit() {
  }

  getUnlinkedScenes(): SceneModel[] {
    const allScenes = this.sceneService.getScenes();

    return allScenes.filter(scene => {
      return scene.id !== this.fromSceneId &&
        !this.linkedSceneIds.some(id => id === scene.id);
    });
  }

  inputIsValid(): boolean {
    return this.displayText !== '' &&
           this.fromSceneId > 0 &&
           this.toSceneId > 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
