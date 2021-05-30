import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.scss']
})
export class TermsandconditionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }

}
