import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-rights',
  templateUrl: './author-rights.component.html',
  styleUrls: ['./author-rights.component.scss']
})
export class AuthorRightsComponent implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }
  
}
