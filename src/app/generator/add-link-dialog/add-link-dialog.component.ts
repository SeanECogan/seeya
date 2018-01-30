import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'seeya-add-link-dialog',
  templateUrl: './add-link-dialog.component.html',
  styleUrls: ['./add-link-dialog.component.css']
})
export class AddLinkDialogComponent implements OnInit {
  linkDisplayText: string;

  constructor(
    public dialogRef: MatDialogRef<AddLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.linkDisplayText = '';
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
