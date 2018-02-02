import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';

import { SceneService } from '../scene/scene.service';

import { LinkModel } from '../../shared/models/link-model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddEditLinkDialogComponent } from '../add-edit-link-dialog/add-edit-link-dialog.component';

@Component({
  selector: 'seeya-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @Input() link: LinkModel;
  @Output() linkEditedEvent = new EventEmitter<LinkModel>();
  @Output() linkRemovedEvent = new EventEmitter<number>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  editLink(): void {
    const dialogRef = this.dialog.open(AddEditLinkDialogComponent, {
      width: '440px',
      disableClose: true,
      data: {
        link: this.link,
        editMode: true
      }
    });

    dialogRef.afterClosed().subscribe(editedLink => {
      if (editedLink) {
        this.linkEditedEvent.emit(editedLink);
      }
    });
  }

  deleteLink(): void {
    this.linkRemovedEvent.emit(this.link.toSceneId);
  }
}
