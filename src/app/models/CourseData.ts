import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CourseData')
export class CourseData {
    @JsonProperty('courseId')
    courseId: string = undefined;
    @JsonProperty('courseObjectives')
    courseObjectives: string = undefined;
    @JsonProperty('creditGrantedByPromotion')
    creditGrantedByPromotion: number = undefined;
    @JsonProperty('evaluationProcedure')
    evaluationProcedure: string = undefined;
    @JsonProperty('hours')
    hours: number = undefined;
    @JsonProperty('name')
    name: string = undefined;
    @JsonProperty('semester')
    semester: number = undefined;
    @JsonProperty('specialisationId')
    specialisationId: string = undefined;
    @JsonProperty('studyLevel')
    studyLevel: string = undefined;

    constructor(obj: any) {
        this.courseId = obj ? (obj.courseId ? obj.courseId : undefined) : undefined;
        this.courseObjectives = obj ? (obj.courseObjectives ? obj.courseObjectives : undefined) : undefined;
        this.creditGrantedByPromotion = obj ? (obj.creditGrantedByPromotion ? obj.creditGrantedByPromotion : undefined) : undefined;
        this.evaluationProcedure = obj ? (obj.evaluationProcedure ? obj.evaluationProcedure : undefined) : undefined;
        this.hours = obj ? (obj.hours ? obj.hours : undefined) : undefined;
        this.name = obj ? (obj.name ? obj.name : undefined) : undefined;
        this.semester = obj ? (obj.semester ? obj.semester : undefined) : undefined;
        this.specialisationId = obj ? (obj.specialisationId ? obj.specialisationId : undefined) : undefined;
        this.studyLevel = obj ? (obj.studyLevel ? obj.studyLevel : undefined) : undefined;
    }
}
