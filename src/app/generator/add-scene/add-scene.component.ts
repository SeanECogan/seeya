import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SceneService } from '../scene/scene.service';
import { AddLinkDialogComponent } from '../add-link-dialog/add-link-dialog.component';

@Component({
  selector: 'seeya-add-scene',
  templateUrl: './add-scene.component.html',
  styleUrls: ['./add-scene.component.css']
})
export class AddSceneComponent implements OnInit {
  newSceneHeader: string;
  newSceneDescription: string;

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService) {
    this.resetInputValues();
  }

  ngOnInit() {
  }

  addScene(): void {
    if (this.sceneService.getNumberOfScenes() === 0) {
      this.sceneService.addScene(
        this.newSceneHeader,
        this.newSceneDescription
      );

      this.resetInputValues();
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

        this.resetInputValues();
      });
    }
  }

  inputIsValid(): boolean {
    return this.newSceneHeader !== '' && this.newSceneDescription !== '';
  }

  private resetInputValues(): void {
    this.newSceneHeader = '';
    this.newSceneDescription = '';
  }
}
