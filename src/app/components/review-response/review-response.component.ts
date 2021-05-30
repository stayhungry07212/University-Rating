import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-review-response',
  templateUrl: './review-response.component.html',
  styleUrls: ['./review-response.component.scss']
})
export class ReviewResponseComponent implements OnInit {

  message: string;

  constructor(private dialogRef: MatDialogRef<ReviewResponseComponent>) { }

  ngOnInit() {
  }

  review() {
    this.dialogRef.close(this.message);
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

}
