import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AzureAiTextAnalysisService } from './services/azure-ai-text-analysis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'UniView';
  firstPage: boolean;

  constructor(private translate: TranslateService, private router: Router, private authService: AuthService, private textAnalysisService: AzureAiTextAnalysisService) {
    this.translate.setDefaultLang('ro');
    this.translate.use('en');
    this.router.events.subscribe(value => {
      router.url.toString() === '/' ? this.firstPage = true : this.firstPage = false;
    });
    this.authService.verifyIfUserAlreadySignedIn();
  }

  ngOnInit() {
  }

}
