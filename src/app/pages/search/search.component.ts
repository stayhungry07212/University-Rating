import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { Categories } from 'src/app/enums/Categories';
import { Sorting } from 'src/app/enums/Sorting';
import { InstitutionType } from 'src/app/enums/InstitutionType';
import { Facilities } from 'src/app/enums/Facilities';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { UniversityData } from 'src/app/models/UniversityData';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  sortTypes: string[] = [];
  typeOfInstitution: string[] = [];
  keywordsSearch = new FormControl();
  descriptionSearch = new FormControl();
  locations = new FormControl();
  facilities = new FormControl();
  locationsList: any[] = [];
  facilitiesList: string[] = [];
  studyLevel = 'University';
  ratingType = 'NoSorting';
  institutionTypeSelection = [];
  bachelorSubscription: Subscription;
  bachelorData = [];
  doctoralSubscription: Subscription;
  doctoralData = [];
  facultiesSubscription: Subscription;
  facultiesData = [];
  mastersSubscription: Subscription;
  mastersData = [];
  universitiesSubscription: Subscription;
  universitiesData: UniversityData[] = [];
  showFilters: boolean;

  constructor(private firebaseService: FirebaseService) {
    this.categories = Object.keys(Categories);
    this.sortTypes = Object.keys(Sorting);
    this.typeOfInstitution = Object.keys(InstitutionType);
    this.getData();
  }

  ngOnInit() {
    this.bachelorSubscription = this.firebaseService
      .getBachelorsData()
      .subscribe((result) => (this.bachelorData = result));
    this.doctoralSubscription = this.firebaseService
      .getDoctoralsData()
      .subscribe((result) => (this.doctoralData = result));
    this.facultiesSubscription = this.firebaseService
      .getFacultiesData()
      .subscribe((result) => (this.facultiesData = result));
    this.mastersSubscription = this.firebaseService
      .getMastersData()
      .subscribe((result) => (this.mastersData = result));
    this.universitiesSubscription = this.firebaseService
      .getUniversitiesData()
      .subscribe((result) => {
        const resultsArray = [];
        result.forEach((item) => {
          resultsArray.push(new UniversityData(item));
        });
        this.universitiesData = resultsArray;
        this.getUniversityLocations(result);
      });
    this.facilitiesList = Object.keys(Facilities);
  }

  getData() {
    switch (this.studyLevel) {
      case 'University':
        return this.getUniversitiesData();
      case 'Faculty':
        return this.getFacultiesData();
      case 'Bachelor':
        return this.getBachelorsData();
      case 'Master':
        return this.getMastersData();
      case 'Doctoral':
        return this.getDoctoralsData();
    }
  }

  private getUniversitiesData() {
    const result = this.universitiesData.filter((university) => {
      return (
        this.matchingNames(university.nameUniversity) &&
        this.matchingLocations(university.locality) &&
        this.matchingType(university.typeUniversity) &&
        this.matchingFacilities(university.facilitiesUniversity) &&
        this.matchingDescription(university.descriptionUniversity)
      );
    });
    return this.sortByRatings(result);
  }

  private getFacultiesData() {
    const result = this.facultiesData.filter((faculty) => {
      return (
        this.matchingNames(faculty.nameFaculty) &&
        this.matchingLocations(faculty.locationFaculty) &&
        this.matchingDescription(faculty.descriptionFaculty)
      );
    });
    return this.sortByRatings(result);
  }

  private getBachelorsData() {
    const dataWithFaculties = [];
    this.bachelorData.forEach((bachelor) => {
      if (bachelor.facultyId) {
        const facultyData = this.facultiesData.filter(
          (faculty) => faculty.facultyId === bachelor.facultyId
        );
        dataWithFaculties.push(Object.assign({}, bachelor, facultyData[0]));
      } else {
        dataWithFaculties.push(bachelor);
      }
    });
    const result = dataWithFaculties.filter((bachelor) => {
      return (
        this.matchingNames(bachelor.name) &&
        this.matchingLocations(bachelor.locationFaculty) &&
        this.matchingDescription(bachelor.descriptionFaculty)
      );
    });
    return this.sortByRatings(result);
  }

  private getMastersData() {
    const dataWithFaculties = [];
    this.mastersData.forEach((master) => {
      if (master.facultyId) {
        const facultyData = this.facultiesData.filter(
          (faculty) => faculty.facultyId === master.facultyId
        );
        dataWithFaculties.push(Object.assign({}, master, facultyData[0]));
      } else {
        dataWithFaculties.push(master);
      }
    });
    const result = dataWithFaculties.filter((master) => {
      return (
        this.matchingNames(master.name) &&
        this.matchingLocations(master.locationFaculty) &&
        this.matchingDescription(master.descriptionFaculty)
      );
    });
    return this.sortByRatings(result);
  }

  private getDoctoralsData() {
    const dataWithFaculties = [];
    this.doctoralData.forEach((doctoral) => {
      if (doctoral.facultyId) {
        const facultyData = this.facultiesData.filter(
          (faculty) => faculty.facultyId === doctoral.facultyId
        );
        dataWithFaculties.push(Object.assign({}, doctoral, facultyData[0]));
      } else {
        dataWithFaculties.push(doctoral);
      }
    });
    const result = dataWithFaculties.filter((doctoral) => {
      return (
        this.matchingNames(doctoral.name) &&
        this.matchingLocations(doctoral.locationFaculty) &&
        this.matchingDescription(doctoral.descriptionFaculty)
      );
    });
    return this.sortByRatings(result);
  }

  private getUniversityLocations(universities: Array<any>) {
    const locations = [];
    universities.forEach((university) => {
      locations.push(university.locality);
    });
    this.locationsList = _.uniq(locations);
  }

  setShowFilters(value: boolean) {
    this.showFilters = value;
  }

  private matchingNames(name: string) {
    return this.keywordsSearch.value
      ? name.toLowerCase().includes(this.keywordsSearch.value.toLowerCase())
      : true;
  }

  private matchingLocations(location: string) {
    return this.locations.value
      ? this.locations.value.search(location) !== -1 ||
          this.locations.value.includes('all_locations')
      : true;
  }

  private matchingType(type: string) {
    if (
      this.institutionTypeSelection.length > 0 &&
      this.institutionTypeSelection.includes(type.toLowerCase())
    ) {
      return true;
    } else if (this.institutionTypeSelection.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  private matchingFacilities(facilities: Array<string>) {
    if (this.facilities.value) {
      if (facilities) {
        return this.facilities.value
          ? facilities.filter((elem) => {
              return this.facilities.value.indexOf(elem) > -1;
            }).length === this.facilities.value.length
          : true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getCityFromAddress(value: any): any {
    const geocoder = new google.maps.Geocoder();
    let city: any;
    return geocoder.geocode({ address: value }, (results, status) => {
      if (status === 'OK') {
        const addressComponents = results[0].address_components;
        city = addressComponents[addressComponents.length - 4].long_name;
        return city;
      } else {
        console.log(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  }

  private matchingDescription(description: string) {
    if (this.descriptionSearch.value) {
      const splittedDescription = this.descriptionSearch.value.split(' ');
      const splittedDescriptionLength = splittedDescription.length;
      const results = [];
      let counter = 0;
      if (this.descriptionSearch.value && this.descriptionSearch.value !== '') {
        splittedDescription.forEach((item) => {
          results.push(
            item ? description.toLowerCase().includes(item.toLowerCase()) : true
          );
        });
        results.forEach((result) => {
          if (result === true) {
            counter = counter + 1;
          }
        });
        if (counter === splittedDescriptionLength) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  sortByRatings(data) {
    let sortedData = data;
    switch (this.ratingType) {
      case 'Ascending':
        sortedData.sort((a: any, b: any) => a.rating - b.rating);
        break;
      case 'Descending':
        sortedData.sort((a: any, b: any) => {
          return b.rating - a.rating;
        });
        break;
      case 'NoSorting':
        sortedData = data;
    }
    return sortedData;
  }

  ngOnDestroy() {
    if (this.bachelorSubscription) {
      this.bachelorSubscription.unsubscribe();
    }
    if (this.doctoralSubscription) {
      this.doctoralSubscription.unsubscribe();
    }
    if (this.facultiesSubscription) {
      this.facultiesSubscription.unsubscribe();
    }
    if (this.mastersSubscription) {
      this.mastersSubscription.unsubscribe();
    }
    if (this.universitiesSubscription) {
      this.universitiesSubscription.unsubscribe();
    }
  }
}
