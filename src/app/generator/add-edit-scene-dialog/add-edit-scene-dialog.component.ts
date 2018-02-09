import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SceneService } from '../scene/scene.service';

import { AddEditLinkDialogComponent } from '../add-edit-link-dialog/add-edit-link-dialog.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

@Component({
  selector: 'seeya-add-edit-scene-dialog',
  templateUrl: './add-edit-scene-dialog.component.html',
  styleUrls: ['./add-edit-scene-dialog.component.css']
})
export class AddEditSceneDialogComponent implements OnInit {
  editMode: boolean;
  editedScene: SceneModel;

  sceneId: number;
  sceneHeader: string;
  sceneDescription: string;
  sceneImageUrl: string;
  sceneLinks: LinkModel[];

  constructor(
    public dialogRef: MatDialogRef<AddEditLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private sceneService: SceneService) {
      this.editMode = data.editMode;

      if (this.editMode) {
        this.sceneId = data.scene.id;
        this.sceneHeader = data.scene.header;
        this.sceneDescription = data.scene.description;
        this.sceneImageUrl = data.scene.imageUrl;
        this.sceneLinks = data.scene.links;
      } else {
        this.sceneId = sceneService.getNextSceneId();
        this.sceneHeader = '';
        this.sceneDescription = '';
        this.sceneImageUrl = '';
        this.sceneLinks = new Array<LinkModel>();
      }
  }

  ngOnInit() {
  }

  addScene(): void {
    this.sceneService.addScene(
      this.sceneId,
      this.sceneHeader,
      this.sceneDescription,
      this.sceneImageUrl,
      this.sceneLinks
    );

    this.dialogRef.close();
  }

  editScene(): void {
    this.sceneService.editScene(
      this.sceneId,
      this.sceneHeader,
      this.sceneDescription,
      this.sceneImageUrl,
      this.sceneLinks
    );

    this.dialogRef.close();
  }

  inputIsValid(): boolean {
    return this.sceneHeader !== '' && this.sceneDescription !== '';
  }

  isCurrentStartScene(): boolean {
    return this.sceneId === this.sceneService.getInitialSceneId();
  }

  otherScenesExist(): boolean {
    return this.sceneService.getNumberOfScenes() > 0;
  }

  setAsStartScene(): void {
    this.sceneService.setInitialSceneId(this.sceneId);
  }

  addLink(): void {
    const dialogRef = this.dialog.open(AddEditLinkDialogComponent, {
      width: '440px',
      disableClose: true,
      data: {
        editMode: false,
        fromSceneId: this.sceneId,
        linkedSceneIds: this.sceneLinks.map(link => link.toSceneId)
      }
    });

    dialogRef.afterClosed().subscribe(newLink => {
      if (newLink) {
        this.sceneLinks.push(newLink);
      }
    });
  }

  editLink(editedLink: LinkModel): void {
      const linkToEdit = this.sceneLinks.filter(link => {
        return link.fromSceneId === editedLink.fromSceneId &&
               link.toSceneId === editedLink.toSceneId;
      })[0];

      if (linkToEdit) {
        linkToEdit.displayText = editedLink.displayText;
      }
  }

  removeLink(linkToId: number): void {
    this.sceneLinks = this.sceneLinks.filter(link => {
      return link.toSceneId !== linkToId;
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
