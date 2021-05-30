import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('FacultyData')
export class FacultyData {
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('bachelors')
    bachelors: string[] = [];
    @JsonProperty('masters')
    masters: string[] = [];
    @JsonProperty('doctorals')
    doctorals: string[] = [];
    @JsonProperty('locationFaculty')
    locationFaculty: string = undefined;
    @JsonProperty('logoFaculty')
    logoFaculty: string = undefined;
    @JsonProperty('nameFaculty')
    nameFaculty: string = undefined;
    @JsonProperty('studyGuide')
    studyGuide: string = undefined;
    @JsonProperty('universityId')
    universityId: string = undefined;
    @JsonProperty('descriptionFaculty')
    descriptionFaculty: string = undefined;

    constructor(obj: any) {
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.bachelors = obj ? (obj.bachelors ? obj.bachelors : []) : [];
        this.masters = obj ? (obj.masters ? obj.masters : []) : [];
        this.doctorals = obj ? (obj.doctorals ? obj.doctorals : []) : [];
        this.locationFaculty = obj ? (obj.locationFaculty ? obj.locationFaculty : undefined) : undefined;
        this.logoFaculty = obj ? (obj.logoFaculty ? obj.logoFaculty : undefined) : undefined;
        this.nameFaculty = obj ? (obj.nameFaculty ? obj.nameFaculty : undefined) : undefined;
        this.studyGuide = obj ? (obj.studyGuide ? obj.studyGuide : undefined) : undefined;
        this.universityId = obj ? (obj.universityId ? obj.universityId : undefined) : undefined;
        this.descriptionFaculty = obj ? (obj.descriptionFaculty ? obj.descriptionFaculty : undefined) : undefined;
    }
}
