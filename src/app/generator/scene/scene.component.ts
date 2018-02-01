import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SceneService } from './scene.service';

import { AddEditSceneDialogComponent } from '../add-edit-scene-dialog/add-edit-scene-dialog.component';

import { SceneModel } from '../../shared/models/scene-model';

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

  editScene() {
    this.dialog.open(AddEditSceneDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        editMode: true,
        sceneId: this.scene.id,
        sceneHeader: this.scene.header,
        sceneDescription: this.scene.description
      }
    });
  }

  deleteScene() {
    this.sceneService.deleteScene(this.scene.id);
  }
}
