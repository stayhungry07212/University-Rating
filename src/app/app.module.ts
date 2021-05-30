import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatTreeModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './pages/search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationPipe } from './pipes/location.pipe';
import { UniversityComponent } from './pages/detailsPages/university/university.component';
import { FacultyComponent } from './pages/detailsPages/faculty/faculty.component';
import { InstantFacilityTranslatePipe } from './pipes/instant-facility-translate.pipe';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FacilityIconsPipe } from './pipes/facility-icons.pipe';
import { AgmCoreModule } from '@agm/core';
import { DirectionsMapDirective } from './directives/directions-map.directive';
import { AuthorRightsComponent } from './pages/author-rights/author-rights.component';
import { ConfidentialityComponent } from './pages/confidentiality/confidentiality.component';
import { TermsandconditionsComponent } from './pages/termsandconditions/termsandconditions.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthService } from './services/auth.service';
import { SignUpDialogComponent } from './components/sign-up-dialog/sign-up-dialog.component';
import { CourseDetailsDialogComponent } from './components/course-details-dialog/course-details-dialog.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DoughnutWidgetComponent } from './components/doughnut-widget/doughnut-widget.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { RequestUniversityComponent } from './pages/request-university/request-university.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { ReviewResponseComponent } from './components/review-response/review-response.component';
import { EditableListComponent } from './components/editable-list/editable-list.component';
import { EditableFacilitiesComponent } from './components/editable-facilities/editable-facilities.component';
import { AutocompleteAddressComponent } from './components/google-places/google-places.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { GetCityFromAddressPipe } from './pipes/get-city-from-address.pipe';
import { AddFacultyDialogComponent } from './components/add-faculty-dialog/add-faculty-dialog.component';
import { EditableCommentsComponent } from './components/editable-comments/editable-comments.component';
import { EditableStarRatingComponent } from './components/editable-star-rating/editable-star-rating.component';
import { FromNumberToArrayPipe } from './pipes/from-number-to-array.pipe';
import { AddProgramDialogComponent } from './components/add-program-dialog/add-program-dialog.component';
import { EditableExpansionPanelComponent } from './components/editable-expansion-panel/editable-expansion-panel.component';
import { EditableChipsListComponent } from './components/editable-chips-list/editable-chips-list.component';
import { WaveButtonComponent } from './components/wave-button/wave-button.component';
import { LimitCharactersInDivPipe } from './pipes/limit-characters-in-div.pipe';
import { InstantSchoolLevelTranslatePipe } from './pipes/instant-school-level-translate.pipe';
import { PresentationCardComponent } from './components/presentation-card/presentation-card.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { BadReviewRequestsComponent } from './pages/bad-review-requests/bad-review-requests.component';

// Firestore config
const config = {
  apiKey: 'AIzaSyCcTEDMXl2kbpnzoF_x5rwdnKJQP_rwD1U',
  authDomain: 'universityraking.firebaseapp.com',
  databaseURL: 'https://universityraking.firebaseio.com',
  projectId: 'universityraking',
  storageBucket: 'universityraking.appspot.com',
  messagingSenderId: '709054246209'
};

// Routes config
const appRoutes: Routes = [
  { path: '', component: HomepageComponent }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DirectionsMapDirective,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    SearchComponent,
    LocationPipe,
    UniversityComponent,
    FacultyComponent,
    InstantFacilityTranslatePipe,
    FacilityIconsPipe,
    AuthorRightsComponent,
    ConfidentialityComponent,
    TermsandconditionsComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    CourseDetailsDialogComponent,
    AdminDashboardComponent,
    DoughnutWidgetComponent,
    BarChartComponent,
    UserDetailsComponent,
    RequestUniversityComponent,
    RequestsComponent,
    ReviewResponseComponent,
    EditableListComponent,
    EditableFacilitiesComponent,
    AutocompleteAddressComponent,
    FileUploaderComponent,
    GetCityFromAddressPipe,
    AddFacultyDialogComponent,
    EditableCommentsComponent,
    EditableStarRatingComponent,
    FromNumberToArrayPipe,
    AddProgramDialogComponent,
    EditableExpansionPanelComponent,
    EditableChipsListComponent,
    WaveButtonComponent,
    LimitCharactersInDivPipe,
    InstantSchoolLevelTranslatePipe,
    PresentationCardComponent,
    FavouritesComponent,
    BadReviewRequestsComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    SignUpDialogComponent,
    CourseDetailsDialogComponent,
    ReviewResponseComponent,
    AddFacultyDialogComponent,
    AddProgramDialogComponent
  ],
  imports: [
    GoogleChartsModule.forRoot('AIzaSyCnKJYJPDPPKIwcf8fnDC7FXvUhRgPg1Gc'),
    // Firestore imports
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnKJYJPDPPKIwcf8fnDC7FXvUhRgPg1Gc'
    }),
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    // Angular material imports
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatTreeModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Router imports
    RouterModule.forRoot(
      appRoutes
    ),
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularSvgIconModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
