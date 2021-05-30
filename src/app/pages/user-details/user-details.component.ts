import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UserData } from 'src/app/models/UserData';
import { Router } from '@angular/router';
import { RequestData } from 'src/app/models/RequestData';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {

  user: UserData;
  isUserSubscription: Subscription;
  name: string;
  surname: string;
  birthday: string;
  sex: string;
  location: string;
  locations: string[];
  canEdit = false;
  requestActive: boolean;
  requestStatus: string;
  requestMessage: string;
  schoolLevelValues = ['primary', 'highschool', 'licence', 'master', 'doctoral', 'finished'];

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) {
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
      this.requestActive = result ? (result.requestId ? true : result.type !== 'user') : false;
      if (result && result.requestId) {
        this.firebaseService.getRequestById(result.requestId).subscribe(response => {
          const data = new RequestData(response);
          this.requestStatus = data.status;
          this.requestMessage = data.adminAnswer;
        });
      }
    });
  }

  getAddress(place: object) {
    const address = 'address_components';
    const addressComponents = place[address];
    this.location = addressComponents[addressComponents.length - 4].long_name;
    this.user.locality = this.location;
  }

  classLevelValues(schoolLevel: string) {
    switch (schoolLevel) {
      case 'primary': return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
      case 'highschool': return ['IX', 'X', 'XI', 'XII'];
      case 'licence': return ['1', '2', '3', '4', '5', '6'];
      case 'master': return ['1', '2', '3'];
      case 'doctoral': return ['1', '2'];
      default: return [''];
    }
  }

  saveNewDetails() {
    return this.firebaseService.editUserDetails(this.user.id, new UserData(this.user)).then(result => {
      this.canEdit = !this.canEdit;
    });
  }

  goToRequestPage(state) {
    this.router.navigateByUrl(`/requestUniversity/${state}`);
  }

  goToUniversityPage() {
    this.router.navigateByUrl(`/university/${this.user.universityId}`);
  }

}
