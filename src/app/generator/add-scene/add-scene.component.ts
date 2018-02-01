import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEditSceneDialogComponent } from '../add-edit-scene-dialog/add-edit-scene-dialog.component';

@Component({
  selector: 'seeya-add-scene',
  templateUrl: './add-scene.component.html',
  styleUrls: ['./add-scene.component.css']
})
export class AddSceneComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialog.open(AddEditSceneDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        editMode: false
      }
    });
  }
}
