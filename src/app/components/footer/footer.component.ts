import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  items = [
    {
      text: 'Termeni si conditii',
      value: 'termsandconditions'
    },
    {
      text: 'Politica de confidentialitate',
      value: 'confidentiality'
    },
    {
      text: 'Drepturi de autor',
      value: 'authorrights'
    },
    {
      text: 'ANPC',
      value: 'https://anpc.ro/index.html'
    },
    {
      text: 'GDPR',
      value: 'https://eugdpr.org/'
    }
  ];

  ngOnInit() {
  }

  onNavigate(link: string) {
    if (link.includes('http')) {
      window.open(link, '_blank');
    } else {
      this.router.navigateByUrl(`/${link}`);
    }
  }

}
