import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service.service';
import { Observable, of, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UniversityData } from '../models/UniversityData';
import { UserData } from '../models/UserData';
import { CourseData } from '../models/CourseData';
import { RequestData } from '../models/RequestData';
import { FacultyData } from '../models/FacultyData';
import * as moment from 'moment';
import * as _ from 'lodash';
import { SpecialisationData } from '../models/SpecialisationData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firebaseService: FirebaseService) { }

  constructData(values: Array<Array<any>>, title: string) {
    return {
      values,
      title
    };
  }

  getNumberOfEducationLevel(): Observable<any> {
    return zip(this.firebaseService.getBachelorsData(),
      this.firebaseService.getDoctoralsData(),
      this.firebaseService.getMastersData())
      .pipe(
        switchMap(([bachelors, doctorals, masters]: [any, any, any]) => {
          return of([
            ['Bachelors', bachelors.length],
            ['Masters', masters.length],
            ['Doctorals', doctorals.length]
          ]);
        })
      );
  }

  getNumbersOfUniversityTypes() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const privateUniversity = result.filter(item => {
          const university = new UniversityData(item);
          return university.typeUniversity === 'Privat';
        });
        const stateUniversity = result.filter(item => {
          const university = new UniversityData(item);
          return university.typeUniversity === 'Stat';
        });
        return of([
          ['Private', privateUniversity.length],
          ['State', stateUniversity.length]
        ]);
      }));
  }

  getUsersSex() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const feminine = result.filter(item => {
          const user = new UserData(item);
          return user.sex === 'F';
        });
        const masculine = result.filter(item => {
          const user = new UserData(item);
          return user.sex === 'M';
        });
        return of([
          ['Feminine', feminine.length],
          ['Masculine', masculine.length]
        ]);
      }));
  }

  getUsersGDPR() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const accepted = result.filter(item => {
          const user = new UserData(item);
          return user.gdpr === true;
        });
        const declined = result.filter(item => {
          const user = new UserData(item);
          return user.gdpr === false;
        });
        return of([
          ['Accepted', accepted.length],
          ['Declined', declined.length]
        ]);
      }));
  }

  getCourseVerificationType() {
    return this.firebaseService.getCoursesData().pipe(
      switchMap((result: []) => {
        const accepted = result.filter(item => {
          const course = new CourseData(item);
          return course.evaluationProcedure === 'exam';
        });
        const declined = result.filter(item => {
          const course = new CourseData(item);
          return course.evaluationProcedure === 'verification';
        });
        return of([
          ['Exam', accepted.length],
          ['Verification', declined.length]
        ]);
      }));
  }

  getRequestsStatuses() {
    return this.firebaseService.getRequestsData().pipe(
      switchMap((result: []) => {
        const pending = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'pending';
        });
        const approved = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'approved';
        });
        const declined = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'l';
        });
        return of([
          ['Pending', pending.length],
          ['Approved', approved.length],
          ['Declined', declined.length]
        ]);
      }));
  }

  getFacultiesPerUniversity() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const facultiesNumber = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.facultiesUniversity) {
            facultiesNumber.push(university.facultiesUniversity.length);
          } else {
            facultiesNumber.push(0);
          }
        });
        const numbers = [...new Set(facultiesNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfFaculties => {
          objectToReturn.push([`${numberOfFaculties} faculties`, numberOfFaculties]);
        });
        return of(objectToReturn);
      })
    );
  }

  getPhotosPerUniversity() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const photosNumber = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.photosUniversity) {
            photosNumber.push(university.photosUniversity.length);
          } else {
            photosNumber.push(0);
          }
        });
        const numbers = [...new Set(photosNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfphotos => {
          objectToReturn.push([`${numberOfphotos} photos`, numberOfphotos]);
        });
        return of(objectToReturn);
      })
    );
  }

  getBachelorsPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const bachelorsNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.bachelors) {
            bachelorsNumber.push(faculty.bachelors.length);
          } else {
            bachelorsNumber.push(0);
          }
        });
        const numbers = [...new Set(bachelorsNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfbachelors => {
          objectToReturn.push([`${numberOfbachelors} bachelors`, numberOfbachelors]);
        });
        return of(objectToReturn);
      })
    );
  }

  getDoctoralsPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const doctoralsNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.doctorals) {
            doctoralsNumber.push(faculty.doctorals.length);
          } else {
            doctoralsNumber.push(0);
          }
        });
        const numbers = [...new Set(doctoralsNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfDoctorals => {
          objectToReturn.push([`${numberOfDoctorals} doctorals`, numberOfDoctorals]);
        });
        return of(objectToReturn);
      })
    );
  }

  getMastersPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const mastersNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.masters) {
            mastersNumber.push(faculty.masters.length);
          } else {
            mastersNumber.push(0);
          }
        });
        const numbers = [...new Set(mastersNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfMasters => {
          objectToReturn.push([`${numberOfMasters} masters`, numberOfMasters]);
        });
        return of(objectToReturn);
      })
    );
  }

  getFacilitiesPerFaculty() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const facilitiesNumber = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.facilitiesUniversity) {
            facilitiesNumber.push(university.facilitiesUniversity.length);
          } else {
            facilitiesNumber.push(0);
          }
        });
        const numbers = [...new Set(facilitiesNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfFacilities => {
          objectToReturn.push([`${numberOfFacilities} facilities`, numberOfFacilities]);
        });
        return of(objectToReturn);
      })
    );
  }

  getUserAges() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const usersAges = [];
        result.forEach(item => {
          const user = new UserData(item);
          if (user.birthday) {
            usersAges.push(Math.round(moment.duration(moment(new Date()).diff(moment(user.birthday))).asYears()));
          } else {
            usersAges.push(0);
          }
        });
        const countOfAges = _.countBy(usersAges);
        const ages = Object.keys(countOfAges);
        const objectToReturn = [];
        ages.forEach(age => {
          objectToReturn.push([`${age}`, countOfAges[age]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getFacilitiesUsage() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const universityFacilities = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.facilitiesUniversity) {
            universityFacilities.push(...university.facilitiesUniversity);
          }
        });
        const countOfFacilities = _.countBy(universityFacilities);
        const facilities = Object.keys(countOfFacilities);
        const objectToReturn = [];
        facilities.forEach(facility => {
          objectToReturn.push([`${facility}`, countOfFacilities[facility]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getUsersClassLevel() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const usersClassLevels = [];
        result.forEach(item => {
          const user = new UserData(item);
          if (user.classLevel) {
            usersClassLevels.push(user.classLevel);
          }
        });
        const countOfClassLevels = _.countBy(usersClassLevels);
        const classLevels = Object.keys(countOfClassLevels);
        const objectToReturn = [];
        classLevels.forEach(classLevel => {
          objectToReturn.push([`${classLevel}`, countOfClassLevels[classLevel]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getUsersSchoolLevel() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const usersSchoolLevels = [];
        result.forEach(item => {
          const user = new UserData(item);
          if (user.schoolLevel) {
            usersSchoolLevels.push(user.schoolLevel);
          }
        });
        const countOfSchoolLevels = _.countBy(usersSchoolLevels);
        const SchoolLevels = Object.keys(countOfSchoolLevels);
        const objectToReturn = [];
        SchoolLevels.forEach(SchoolLevel => {
          objectToReturn.push([`${SchoolLevel}`, countOfSchoolLevels[SchoolLevel]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getUsersLocation() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const usersLocations = [];
        result.forEach(item => {
          const user = new UserData(item);
          if (user.locality) {
            usersLocations.push(user.locality);
          }
        });
        const countOfLocations = _.countBy(usersLocations);
        const Locations = Object.keys(countOfLocations);
        const objectToReturn = [];
        Locations.forEach(Location => {
          objectToReturn.push([`${Location}`, countOfLocations[Location]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getUniversitiesLocation() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const universityLocations = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.locality) {
            universityLocations.push(university.locality);
          }
        });
        const countOfLocations = _.countBy(universityLocations);
        const Locations = Object.keys(countOfLocations);
        const objectToReturn = [];
        Locations.forEach(Location => {
          objectToReturn.push([`${Location}`, countOfLocations[Location]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getBachelorsYears() {
    return this.firebaseService.getBachelorsData().pipe(
      switchMap((result: []) => {
        const BachelorsYears = [];
        result.forEach(item => {
          const bachelor = new SpecialisationData(item);
          if (bachelor.years) {
            BachelorsYears.push(bachelor.years);
          }
        });
        const countOfYears = _.countBy(BachelorsYears);
        const Years = Object.keys(countOfYears);
        const objectToReturn = [];
        Years.forEach(Year => {
          objectToReturn.push([`${Year}`, countOfYears[Year]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getMastersYears() {
    return this.firebaseService.getMastersData().pipe(
      switchMap((result: []) => {
        const MastersYears = [];
        result.forEach(item => {
          const bachelor = new SpecialisationData(item);
          if (bachelor.years) {
            MastersYears.push(bachelor.years);
          }
        });
        const countOfYears = _.countBy(MastersYears);
        const Years = Object.keys(countOfYears);
        const objectToReturn = [];
        Years.forEach(Year => {
          objectToReturn.push([`${Year}`, countOfYears[Year]]);
        });
        return of(objectToReturn);
      })
    );
  }

  getDoctoralsYears() {
    return this.firebaseService.getDoctoralsData().pipe(
      switchMap((result: []) => {
        const DoctoralsYears = [];
        result.forEach(item => {
          const bachelor = new SpecialisationData(item);
          if (bachelor.years) {
            DoctoralsYears.push(bachelor.years);
          }
        });
        const countOfYears = _.countBy(DoctoralsYears);
        const Years = Object.keys(countOfYears);
        const objectToReturn = [];
        Years.forEach(Year => {
          objectToReturn.push([`${Year}`, countOfYears[Year]]);
        });
        return of(objectToReturn);
      })
    );
  }

}
