import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DoughnutData } from 'src/app/models/DoughnutData';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminDashboardComponent implements OnInit {

  totalEducationLevel: any;
  universityTypes: any;
  usersSex: any;
  usersGDPR: any;
  courseVerificationType: any;
  requestsStatuses: any;
  facultiesPerUniversity: any;
  photosPerUniversity: any;
  bachelorsPerUniversity: any;
  mastersPerUniversity: any;
  doctoralsPerUniversity: any;
  facilitiesPerUniversity: any;
  userAges: any;
  facilitiesUsage: any;
  classLevels: any;
  schoolLevels: any;
  userLocations: any;
  universityLocations: any;
  bachelorYears: any;
  mastersYears: any;
  doctoralsYears: any;
  bachelorsData = [];
  bachelorsDisplayedColumns: string[] = ['id', 'name', 'courses', 'years', 'semesters', 'skills', 'perspectives', 'facultyId'];
  mastersData = [];
  mastersDisplayedColumns: string[] = ['id', 'name', 'courses', 'facultyId'];
  doctoralsData = [];
  doctoralsDisplayedColumns: string[] = ['id', 'name', 'courses'];
  facultiesData = [];
  facultiesDisplayedColumns: string[] = ['id', 'name', 'bachelors', 'masters', 'doctorals', 'universityId'];
  universitiesData = [];
  // tslint:disable-next-line: max-line-length
  universitiesDisplayedColumns: string[] = ['id', 'name', 'facilitiesUniversity', 'facultiesUniversity', 'photosUniversity', 'rating', 'strategicProgram', 'typeUniversity'];
  usersData = [];
  usersDisplayedColumns: string[] = ['id', 'name', 'surname', 'birthday', 'sex', 'email', 'gdpr', 'locality'];

  constructor(private dashboardService: DashboardService, private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.firebaseService.getBachelorsData().subscribe(result => this.bachelorsData = result);
    this.firebaseService.getMastersData().subscribe(result => this.mastersData = result);
    this.firebaseService.getDoctoralsData().subscribe(result => this.doctoralsData = result);
    this.firebaseService.getFacultiesData().subscribe(result => this.facultiesData = result);
    this.firebaseService.getUniversitiesData().subscribe(result => this.universitiesData = result);
    this.firebaseService.getUsersData().subscribe(result => this.usersData = result);

    this.dashboardService.getNumberOfEducationLevel().subscribe(result => {
      this.totalEducationLevel =
        new DoughnutData(this.dashboardService.constructData(result, 'Education level'));
    });

    this.dashboardService.getNumbersOfUniversityTypes().subscribe(result => {
      this.universityTypes = new DoughnutData(this.dashboardService.constructData(result, 'University types'));
    });

    this.dashboardService.getUsersSex().subscribe(result => {
      this.usersSex = new DoughnutData(this.dashboardService.constructData(result, 'Users sex'));
    });

    this.dashboardService.getUsersGDPR().subscribe(result => {
      this.usersGDPR = new DoughnutData(this.dashboardService.constructData(result, 'Users GDPR'));
    });

    this.dashboardService.getCourseVerificationType().subscribe(result => {
      this.courseVerificationType = new DoughnutData(this.dashboardService.constructData(result, 'Course verification type'));
    });

    this.dashboardService.getRequestsStatuses().subscribe(result => {
      this.requestsStatuses = new DoughnutData(this.dashboardService.constructData(result, 'Requests statuses'));
    });

    this.dashboardService.getFacultiesPerUniversity().subscribe(result => {
      this.facultiesPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Faculties per university'));
    });

    this.dashboardService.getPhotosPerUniversity().subscribe(result => {
      this.photosPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Photos per university'));
    });

    this.dashboardService.getBachelorsPerFaculty().subscribe(result => {
      this.bachelorsPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Bachelors per university'));
    });

    this.dashboardService.getMastersPerFaculty().subscribe(result => {
      this.mastersPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Masters per university'));
    });

    this.dashboardService.getDoctoralsPerFaculty().subscribe(result => {
      this.doctoralsPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Doctorals per university'));
    });

    this.dashboardService.getFacilitiesPerFaculty().subscribe(result => {
      this.facilitiesPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Facilities per university'));
    });

    this.dashboardService.getUserAges().subscribe(result => {
      this.userAges = new DoughnutData(this.dashboardService.constructData(result, 'User ages'));
    });

    this.dashboardService.getFacilitiesUsage().subscribe(result => {
      this.facilitiesUsage = new DoughnutData(this.dashboardService.constructData(result, 'Facilities usage'));
    });

    this.dashboardService.getUsersClassLevel().subscribe(result => {
      this.classLevels = new DoughnutData(this.dashboardService.constructData(result, 'Users class levels'));
    });

    this.dashboardService.getUsersSchoolLevel().subscribe(result => {
      this.schoolLevels = new DoughnutData(this.dashboardService.constructData(result, 'Users school levels'));
    });

    this.dashboardService.getUsersLocation().subscribe(result => {
      this.userLocations = new DoughnutData(this.dashboardService.constructData(result, 'Users locations'));
    });

    this.dashboardService.getUniversitiesLocation().subscribe(result => {
      this.universityLocations = new DoughnutData(this.dashboardService.constructData(result, 'Universities locations'));
    });

    this.dashboardService.getBachelorsYears().subscribe(result => {
      this.bachelorYears = new DoughnutData(this.dashboardService.constructData(result, 'Bachelors years'));
    });

    this.dashboardService.getMastersYears().subscribe(result => {
      this.mastersYears = new DoughnutData(this.dashboardService.constructData(result, 'Masters years'));
    });

    this.dashboardService.getDoctoralsYears().subscribe(result => {
      this.doctoralsYears = new DoughnutData(this.dashboardService.constructData(result, 'Doctorals years'));
    });

  }

}
