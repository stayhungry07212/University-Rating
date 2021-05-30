import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confidentiality',
  templateUrl: './confidentiality.component.html',
  styleUrls: ['./confidentiality.component.scss']
})
export class ConfidentialityComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }

}
