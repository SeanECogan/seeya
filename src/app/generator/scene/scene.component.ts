import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SceneService } from './scene.service';

import { AddEditSceneDialogComponent } from '../add-edit-scene-dialog/add-edit-scene-dialog.component';

import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';
import { FlagModel } from '../../shared/models/flag-model';
import { FlagReferenceModel } from '../../shared/models/flag-reference-model';

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
              link.displayText,
              link.flagReferences.map(flagReference => {
                return new FlagReferenceModel(
                  flagReference.id,
                  flagReference.sceneId
                );
              })
            );
          }),
          this.scene.flags.map(flag => {
            return new FlagModel(
              flag.id,
              flag.sceneId,
              flag.name,
              flag.isSet
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
