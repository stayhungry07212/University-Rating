import { Component, OnInit, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input() firstPage: boolean;
  user: any;
  isSticky: boolean;
  isUserSubscription: Subscription;

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 50) {
       this.isSticky = true;
     } else {
      this.isSticky = false;
     }
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
    });
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  goToFavourites() {
    this.router.navigateByUrl('/favourites');
  }

  goToUserDetails() {
    this.router.navigateByUrl('/userdetails');
  }

  goToRequests() {
    this.router.navigateByUrl('/universityRequests');
  }

  goToReviewRequests() {
    this.router.navigateByUrl('/reviewRequests');
  }

  logOutUser() {
    this.authService.logOut();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '50vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.setUser(result.user.uid);
      }
    });
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: '80vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.setUser(result.user.uid);
      }
    });
  }
}
