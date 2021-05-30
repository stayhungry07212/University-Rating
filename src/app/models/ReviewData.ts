import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ReviewData')
export class ReviewData {
    @JsonProperty('comment')
    comment: string = undefined;
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('status')
    status: string = undefined;
    @JsonProperty('universityId')
    universityId: string = undefined;
    @JsonProperty('userId')
    userId: string = undefined;
    @JsonProperty('reviewId')
    reviewId: string = undefined;
    @JsonProperty('stars')
    stars: number = undefined;
    @JsonProperty('date')
    date: string = undefined;

    constructor(obj: any) {
        this.comment = obj ? (obj.comment ? obj.comment : undefined) : undefined;
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.status = obj ? (obj.status ? obj.status : undefined) : undefined;
        this.universityId = obj ? (obj.universityId ? obj.universityId : undefined) : undefined;
        this.userId = obj ? (obj.userId ? obj.userId : undefined) : undefined;
        this.reviewId = obj ? (obj.reviewId ? obj.reviewId : undefined) : undefined;
        this.stars = obj ? (obj.stars ? obj.stars : undefined) : undefined;
        this.date = obj ? (obj.date ? obj.date : undefined) : undefined;
    }
}
