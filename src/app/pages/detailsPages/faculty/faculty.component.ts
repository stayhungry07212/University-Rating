import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { SpecialisationData } from 'src/app/models/SpecialisationData';
import { MatDialog } from '@angular/material';
import { ReviewData } from 'src/app/models/ReviewData';
import { UserData } from 'src/app/models/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddProgramDialogComponent } from 'src/app/components/add-program-dialog/add-program-dialog.component';

export interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacultyComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;
  facultyDetails: FacultyData;
  universityDetails: UniversityData;
  bachelorsData: SpecialisationData[] = [];
  mastersData: SpecialisationData[] = [];
  doctoralsData: SpecialisationData[] = [];
  reviewsData: ReviewData[];
  facultyId: string;
  user: UserData;
  userCanEditBoolean: boolean;
  editEnabled: boolean;
  isUserSubscription: Subscription;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.facultyId = params.get('id');
      if (this.facultyId) {
        this.firebaseService.getFacultyById(this.facultyId).subscribe(data => {
          this.facultyDetails = new FacultyData(data);
          this.bachelorsData = [];
          this.mastersData = [];
          this.doctoralsData = [];
          this.buildForm();
          if (this.facultyDetails.universityId) {
            this.firebaseService.getUniversityById(this.facultyDetails.universityId).subscribe(university => {
              this.universityDetails = new UniversityData(university);
              if (university) {
                this.userCanEdit();
              }
            });
          }
          this.getReviews();
          this.getBachelors();
          this.getMasters();
          this.getDoctorals();
        });
      }
    });
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = new UserData(result);
      if (result) {
        this.userCanEdit();
        this.showAddNewComment(this.reviewsData);
      }
    });
  }

  goToWebsite(url: string) {
    window.open(url, '_blank');
  }

  goToUniversity(id: string) {
    this.router.navigateByUrl(`/university/${id}`);
  }

  private buildForm() {
    this.form = new FormGroup({
      nameFaculty: new FormControl(this.facultyDetails.nameFaculty, [Validators.required]),
      studyGuide: new FormControl(this.facultyDetails.studyGuide, [Validators.required]),
      facultyId: new FormControl(this.facultyDetails.facultyId, [Validators.required]),
      descriptionFaculty: new FormControl(this.facultyDetails.descriptionFaculty, [Validators.required]),
      locationFaculty: new FormControl(this.facultyDetails.locationFaculty, [Validators.required]),
    });
  }

  saveDetails() {
    this.editEnabled = !this.editEnabled;
    this.firebaseService.saveFacultyDetails(this.form.value);
  }

  editDetails() {
    this.editEnabled = !this.editEnabled;
    this.userCanEdit();
  }

  userCanEdit() {
    this.userCanEditBoolean = this.user && this.universityDetails ? this.user.universityId === this.universityDetails.universityId : false;
  }

  getBachelors() {
    this.bachelorsData = [];
    if (this.facultyDetails.bachelors.length > 0) {
      this.facultyDetails.bachelors.forEach(id => {
        this.firebaseService.getBacheloryById(id).subscribe(bachelor => {
          const data = new SpecialisationData(bachelor);
          const exists = this.bachelorsData.findIndex(item => item.id === data.id);
          if (exists === -1) {
            this.bachelorsData.push(data);
          } else {
            this.bachelorsData[exists] = data;
          }
        });
      });
    }
  }

  getReviews() {
    this.firebaseService.getReviewsData().subscribe(data => {
      this.reviewsData = [];
      data.forEach(review => {
        const reviewDetails = new ReviewData(review);
        if (reviewDetails.facultyId === this.facultyId && reviewDetails.status !== 'declined') {
          this.reviewsData.push(reviewDetails);
        }
      });
      this.showAddNewComment(this.reviewsData);
    });
  }

  addProgramDialog(type: string) {
    const dialogRef = this.dialog.open(AddProgramDialogComponent, {
      width: '50vw',
      disableClose: true,
      data: type
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.firebaseService.setNewProgramForUniversity(this.facultyDetails,
          result.name, type);
      }
    });
  }

  getMasters() {
    this.mastersData = [];
    if (this.facultyDetails.masters.length > 0) {
      this.facultyDetails.masters.forEach(id => {
        this.firebaseService.getMasterById(id).subscribe(master => {
          const data = new SpecialisationData(master);
          const exists = this.mastersData.findIndex(item => item.id === data.id);
          if (exists === -1) {
            this.mastersData.push(data);
          } else {
            this.mastersData[exists] = data;
          }
        });
      });
    }
  }

  getAddress(place: any) {
    const addressComponents = place.address_components;
    this.form.value.locationFaculty = addressComponents[addressComponents.length - 4].long_name;
  }

  getDoctorals() {
    this.doctoralsData = [];
    if (this.facultyDetails.doctorals.length > 0) {
      this.facultyDetails.doctorals.forEach(id => {
        this.firebaseService.getDoctoralById(id).subscribe(doctoral => {
          const data = new SpecialisationData(doctoral);
          const exists = this.doctoralsData.findIndex(item => item.id === data.id);
          if (exists === -1) {
            this.doctoralsData.push(data);
          } else {
            this.doctoralsData[exists] = data;
          }
        });
      });
    }
  }

  showAddNewComment(data: any) {
    if (data && data.filter((item: ReviewData) => item.userId === this.user.id).length === 0) {
      const newCommentForPresentLoggedInUser = {
        facultyId: this.facultyId,
        userId: this.user.id,
        date: new Date(),
        status: 'approved',
        stars: 5
      };
      this.reviewsData.push(new ReviewData(newCommentForPresentLoggedInUser));
    }
  }

  onNavigate(id: string) {
    this.router.navigateByUrl(`/university/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
