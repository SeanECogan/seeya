import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SceneService } from './scene.service';

import { AddEditSceneDialogComponent } from '../add-edit-scene-dialog/add-edit-scene-dialog.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

@Component({
  selector: 'seeya-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @Input() scene: SceneModel;

  constructor(
    public dialog: MatDialog,
    private sceneService: SceneService
  ) {}

  ngOnInit() {
  }

  isStartScene(): boolean {
    return this.scene.id === this.sceneService.getInitialSceneId();
  }

  getLinkedSceneIds(): string {
    return this.scene.links.map(link => link.toSceneId).join(', ');
  }

  editScene(): void {
    this.dialog.open(AddEditSceneDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        editMode: true,
        // Dirty manual deep copy.
        scene: new SceneModel(
          this.scene.id,
          this.scene.header,
          this.scene.description,
          this.scene.imageUrl,
          this.scene.links.map(link => {
            return new LinkModel(
              link.fromSceneId,
              link.toSceneId,
              link.displayText
            );
          })
        )
      }
    });
  }

  deleteScene(): void {
    this.sceneService.deleteScene(this.scene.id);
  }
}
