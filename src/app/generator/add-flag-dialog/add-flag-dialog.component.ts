import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SceneService } from '../scene/scene.service';

import { FlagFactory } from '../../shared/factories/flag-factory';

@Component({
  selector: 'seeya-add-flag-dialog',
  templateUrl: './add-flag-dialog.component.html',
  styleUrls: ['./add-flag-dialog.component.css']
})
export class AddFlagDialogComponent implements OnInit {
  ff: FlagFactory;

  sceneId: number;
  name: string;

  previousMaxId: number;

  constructor(
    public sceneService: SceneService,
    public dialogRef: MatDialogRef<AddFlagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ff = new FlagFactory();

      this.sceneId = data.sceneId;
      this.name = '';

      this.previousMaxId = data.previousMaxId;
  }

  ngOnInit() {
  }

  getNextFlagId(): number {
    // This will return the max ID for all Flags that have been saved to
    // a Scene previously.
    const allNextFlagId = this.sceneService.getNextFlagId();

    // If other new Flags have been added since this Scene was saved,
    // then previousMaxId will be larger than allNextFlagId, so we'll need
    // to use that as our baseline instead.
    return Math.max(allNextFlagId, this.previousMaxId + 1);
  }

  inputIsValid(): boolean {
    return this.sceneId > 0 &&
      this.name !== '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
