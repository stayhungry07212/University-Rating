import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CourseData } from 'src/app/models/CourseData';
import { MatDialog } from '@angular/material';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';

@Component({
  selector: 'app-editable-chips-list',
  templateUrl: './editable-chips-list.component.html',
  styleUrls: ['./editable-chips-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableChipsListComponent implements OnInit {

  @Input() courses: CourseData[];
  @Input() editable: boolean;
  @Input() specialisationId: string;
  @Input() specialisationType: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  showInfoAboutCourse(course: CourseData) {
    this.dialog.open(CourseDetailsDialogComponent, {
      width: '50vw',
      data: { course, editable: false, new: false}
    });
  }

  addNewCourse() {
    const course = new CourseData(null);
    course.specialisationId = this.specialisationId;
    course.studyLevel = this.specialisationType;
    this.dialog.open(CourseDetailsDialogComponent, {
      width: '50vw',
      data: { course, editable: true, new: true}
    });
  }

}
