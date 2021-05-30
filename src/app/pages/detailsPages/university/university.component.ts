import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { } from 'googlemaps';
import { ILatLng } from 'src/app/directives/directions-map.directive';
import { FunctionsService } from 'src/app/services/functions.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Facilities } from 'src/app/enums/Facilities';
import { MatDialog } from '@angular/material';
import { AddFacultyDialogComponent } from 'src/app/components/add-faculty-dialog/add-faculty-dialog.component';
import { ReviewData } from 'src/app/models/ReviewData';
import { UserData } from 'src/app/models/UserData';
// import * as Vibrant from 'node-vibrant';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UniversityComponent implements OnInit, OnDestroy {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  paramSubscription: Subscription;
  universityDetails: UniversityData = new UniversityData(undefined);
  facultiesData: FacultyData[] = [];
  reviewsData: ReviewData[] = [];
  displayedColumns: string[] = ['name', 'bachelors', 'masters', 'doctorals', 'button', 'remove'];
  origin: ILatLng;
  destination: any;
  displayDirections = false;
  zoom = 25;
  userCanEdit: boolean;
  isUserSubscription: Subscription;
  universityId: string;
  form: FormGroup;
  user: UserData;
  editEnabled: boolean;
  facilitiesList = Object.keys(Facilities);
  image: string;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router,
              private functionsService: FunctionsService, private authService: AuthService, private dialog: MatDialog) {
    this.buildForm();
  }

  addFacultyDialog() {
    const dialogRef = this.dialog.open(AddFacultyDialogComponent, {
      width: '50vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.setNewFacultyForUniversity(this.universityDetails.universityId,
        result, this.universityDetails.facultiesUniversity);
    });
  }

  goToWebsite(url: string) {
    window.open(url, '_blank');
  }

  private buildForm() {
    this.form = new FormGroup({
      nameUniversity: new FormControl(this.universityDetails.nameUniversity, [Validators.required]),
      universityId: new FormControl(this.universityDetails.universityId, [Validators.required]),
      typeUniversity: new FormControl(this.universityDetails.typeUniversity, [Validators.required]),
      descriptionUniversity: new FormControl(this.universityDetails.descriptionUniversity, [Validators.required]),
      mission: new FormControl(this.universityDetails.mission, [Validators.required]),
      strategicProgram: new FormControl(this.universityDetails.strategicProgram, [Validators.required]),
      values: new FormControl(this.universityDetails.values, [Validators.required]),
      vision: new FormControl(this.universityDetails.vision, [Validators.required]),
      phone: new FormControl(this.universityDetails.phone, [Validators.required]),
      address: new FormControl(this.universityDetails.address, [Validators.required]),
      fax: new FormControl(this.universityDetails.fax, [Validators.required]),
      locality: new FormControl(this.universityDetails.locality, [Validators.required]),
      websiteUniversity: new FormControl(this.universityDetails.websiteUniversity, [Validators.required]),
      facilitiesUniversity: new FormControl(this.universityDetails.facilitiesUniversity, [Validators.required])
    });
  }

  getAddress(place: any) {
    this.form.value.address = place.formatted_address;
    const addressComponents = place.address_components;
    this.form.value.locality = addressComponents[addressComponents.length - 4].long_name;
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = new UserData(result);
      this.userEditable();
      this.functionsService.getPosition().then(pos => {
        this.origin = {
          latitude: pos.lat,
          longitude: pos.lng
        };
      });
      if (this.user.id && this.universityId) {
        this.showAddNewComment();
      }
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.universityId = params.get('id');
      this.userEditable();
      if (this.universityId) {
        this.firebaseService.getUniversityById(this.universityId).subscribe(data => {
          this.universityDetails = new UniversityData(data);
          // Vibrant.from('path/to/image').getPalette().then((palette) => console.log(palette))
          this.buildForm();
          if (this.universityDetails.address) {
            this.getLatLng(this.universityDetails.address);
          }
        });
        this.firebaseService.getFacultiesData().subscribe(data => {
          this.facultiesData = [];
          data.forEach(faculty => {
            const facultyDetails = new FacultyData(faculty);
            if (facultyDetails.universityId === this.universityId) {
              this.facultiesData.push(facultyDetails);
            }
          });
        });
        this.firebaseService.getReviewsData().subscribe(data => {
          this.reviewsData = [];
          data.forEach(review => {
            const reviewDetails = new ReviewData(review);
            if (reviewDetails.universityId === this.universityId && reviewDetails.status !== 'declined') {
              this.reviewsData.push(reviewDetails);
            }
          });
          if (this.user.id && this.universityId) {
            this.showAddNewComment();
          }
        });
      }
    });
  }

  showAddNewComment() {
    if (this.reviewsData.filter((item: ReviewData) => item.userId === this.user.id).length === 0) {
      const newCommentForPresentLoggedInUser = {
        universityId: this.universityId,
        userId: this.user.id,
        date: new Date(),
        status: 'approved',
        stars: 5
      };
      this.reviewsData.push(new ReviewData(newCommentForPresentLoggedInUser));
    }
  }

  getLatLng(address: string) {
    const geocoder = new google.maps.Geocoder();
    let LatLng;
    geocoder.geocode({ address }, (results, status) => {
      LatLng = results[0] ? results[0].geometry.location : null;
      this.destination = LatLng.toJSON();
      this.displayDirections = true;
    });
  }

  facilitiesListEdited(event: any) {
    this.universityDetails.facilitiesUniversity = event;
  }

  userEditable() {
    this.userCanEdit = this.user ? this.user.universityId === this.universityId : false;
  }

  modifyValuesFromList(event: Array<any>, type: string) {
    this.universityDetails[type] = event;
  }

  isArray(item: any) {
    return Array.isArray(item);
  }

  editDetails() {
    this.editEnabled = !this.editEnabled;
    this.userEditable();
  }

  saveDetails() {
    this.editEnabled = !this.editEnabled;
    this.firebaseService.saveUniversityDetails(this.form.value);
  }

  removeFaculty(data: any) {
    this.firebaseService.facultyRemove(data);
  }

  onNavigate(id: string) {
    this.router.navigateByUrl(`/faculty/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.isUserSubscription) {
      this.isUserSubscription.unsubscribe();
    }
  }

}
