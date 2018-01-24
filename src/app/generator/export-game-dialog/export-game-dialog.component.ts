import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'seeya-export-game-dialog',
  templateUrl: './export-game-dialog.component.html',
  styleUrls: ['./export-game-dialog.component.css']
})
export class ExportGameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ExportGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.copySuccessful = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copySuccessful: boolean;
}
