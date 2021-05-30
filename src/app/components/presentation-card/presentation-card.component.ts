import { Component, OnInit, Input, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-presentation-card',
  templateUrl: './presentation-card.component.html',
  styleUrls: ['./presentation-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresentationCardComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() type: string;
  @Input() id: string;
  isUserSubscription: Subscription;
  user: UserData;

  constructor(private router: Router, private authService: AuthService, private firebaseService: FirebaseService) {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = new UserData(result);
    });
  }

  ngOnInit() {
    if (this.id) {
      this.getDataByTypeAndId(this.type, this.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.id && changes.id.currentValue) {
      this.getDataByTypeAndId(this.type, this.id);
    }
  }

  getDataByTypeAndId(type: string, id: string) {
    switch (type) {
      case 'University':
        this.firebaseService.getUniversityById(id).subscribe(data => this.data = data);
        break;
      case 'Faculty':
        this.firebaseService.getFacultyById(id).subscribe(data => this.data = data);
        break;
      case 'Bachelor':
        this.firebaseService.getBacheloryById(id).subscribe(data => this.data = data);
        break;
      case 'Master':
        this.firebaseService.getMasterById(id).subscribe(data => this.data = data);
        break;
      case 'Doctoral':
        this.firebaseService.getDoctoralById(id).subscribe(data => this.data = data);
        break;
    }
  }

  goTo() {
    switch (this.type) {
      case 'University': this.router.navigateByUrl(`/university/${this.data && this.data.universityId ? this.data.universityId : this.id}`);
                         break;
      default: this.router.navigateByUrl(`/faculty/${this.data && this.data.facultyId ? this.data.facultyId : this.id}`);
               break;
    }
  }

  findifFavourite() {
    switch (this.type) {
      case 'University': return this.user.favouritesUniversities.includes(this.data && this.data.universityId ? this.data.universityId : this.id);
      case 'Faculty': return this.user.favouritesFaculties.includes(this.data && this.data.facultyId ? this.data.facultyId : this.id);
      case 'Master': return this.user.favouritesMasters.includes(this.data && this.data.id ? this.data.id : this.id);
      case 'Bachelor': return this.user.favouritesBachelors.includes(this.data && this.data.id ? this.data.id : this.id);
      case 'Doctoral': return this.user.favouritesDoctorals.includes(this.data && this.data.id ? this.data.id : this.id);
    }
  }

  removeFromFavourite(id: string) {
    switch (this.type) {
      case 'University': this.firebaseService.removeFavourite(id, this.type, this.user.id, this.user.favouritesUniversities);
                         break;
      case 'Faculty': this.firebaseService.removeFavourite(id, this.type, this.user.id, this.user.favouritesFaculties);
                      break;
      case 'Master': this.firebaseService.removeFavourite(id, this.type, this.user.id, this.user.favouritesMasters);
                     break;
      case 'Bachelor': this.firebaseService.removeFavourite(id, this.type, this.user.id, this.user.favouritesBachelors);
                       break;
      case 'Doctoral': this.firebaseService.removeFavourite(id, this.type, this.user.id, this.user.favouritesDoctorals);
                       break;
    }
  }

  addFavourite(id: string) {
    switch (this.type) {
      case 'University': this.firebaseService.addToFavourite(id, this.type, this.user.id, this.user.favouritesUniversities);
                         break;
      case 'Faculty': this.firebaseService.addToFavourite(id, this.type, this.user.id, this.user.favouritesFaculties);
                      break;
      case 'Master': this.firebaseService.addToFavourite(id, this.type, this.user.id, this.user.favouritesMasters);
                     break;
      case 'Bachelor': this.firebaseService.addToFavourite(id, this.type, this.user.id, this.user.favouritesBachelors);
                       break;
      case 'Doctoral': this.firebaseService.addToFavourite(id, this.type, this.user.id, this.user.favouritesDoctorals);
                       break;
    }
  }
}
