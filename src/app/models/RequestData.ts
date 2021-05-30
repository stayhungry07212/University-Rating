import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('RequestData')
export class RequestData {
    @JsonProperty('address')
    address: string = undefined;
    @JsonProperty('contact')
    contact: string = undefined;
    @JsonProperty('descriptionUniversity')
    descriptionUniversity: string = undefined;
    @JsonProperty('email')
    email: string = undefined;
    @JsonProperty('locationUniversity')
    locationUniversity: string[] = [];
    @JsonProperty('facilitiesUniversity')
    facilitiesUniversity: string[] = [];
    @JsonProperty('logoUniversity')
    logoUniversity: string = undefined;
    @JsonProperty('nameUniversity')
    nameUniversity: string = undefined;
    @JsonProperty('phone')
    phone: string = undefined;
    @JsonProperty('photosUniversity')
    photosUniversity: string[] = [];
    @JsonProperty('status')
    status: string = undefined;
    @JsonProperty('typeUniversity')
    typeUniversity: string = undefined;
    @JsonProperty('userId')
    userId: string = undefined;
    @JsonProperty('websiteUniversity')
    websiteUniversity: string = undefined;
    @JsonProperty('requestId')
    requestId: string = undefined;
    @JsonProperty('adminAnswer')
    adminAnswer: string = undefined;

    constructor(obj: any) {
        this.address = obj ? (obj.address ? obj.address : undefined) : undefined;
        this.requestId = obj ? (obj.requestId ? obj.requestId : undefined) : undefined;
        this.contact = obj ? (obj.contact ? obj.contact : undefined) : undefined;
        this.descriptionUniversity = obj ? (obj.descriptionUniversity ? obj.descriptionUniversity : undefined) : undefined;
        this.email = obj ? (obj.email ? obj.email : undefined) : undefined;
        this.logoUniversity = obj ? (obj.logoUniversity ? obj.logoUniversity : undefined) : undefined;
        this.nameUniversity = obj ? (obj.nameUniversity ? obj.nameUniversity : undefined) : undefined;
        this.phone = obj ? (obj.phone ? obj.phone : undefined) : undefined;
        this.status = obj ? (obj.status ? obj.status : undefined) : undefined;
        this.adminAnswer = obj ? (obj.adminAnswer ? obj.adminAnswer : undefined) : undefined;
        this.typeUniversity = obj ? (obj.typeUniversity ? obj.typeUniversity : undefined) : undefined;
        this.userId = obj ? (obj.userId ? obj.userId : undefined) : undefined;
        this.websiteUniversity = obj ? (obj.websiteUniversity ? obj.websiteUniversity : undefined) : undefined;
        this.locationUniversity = obj ? (obj.locationUniversity ? obj.locationUniversity : []) : [];
        this.photosUniversity = obj ? (obj.photosUniversity ? obj.photosUniversity : []) : [];
        this.facilitiesUniversity = obj ? (obj.facilitiesUniversity ? obj.facilitiesUniversity : []) : [];
    }
}
