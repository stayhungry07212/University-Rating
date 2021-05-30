import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FavouritesComponent implements OnInit {

  user: UserData;
  isUserSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
    });
  }

}
