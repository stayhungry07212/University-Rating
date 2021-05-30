import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseData } from 'src/app/models/CourseData';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-course-details-dialog',
  templateUrl: './course-details-dialog.component.html',
  styleUrls: ['./course-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailsDialogComponent implements OnInit {

  course: CourseData;
  editable: boolean;
  new: boolean;

  constructor(public dialogRef: MatDialogRef<CourseDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public params: any, private firebaseService: FirebaseService) {
                this.course = params.course;
                this.editable = params.editable;
                this.new = params.new;
              }

  ngOnInit() {
  }

  removeCourse(course: CourseData) {
    this.firebaseService.removeCourse(course);
    this.dialogRef.close();
  }

  addCourse() {
    this.firebaseService.addCourse(this.course);
    this.dialogRef.close();
  }

}
