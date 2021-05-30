import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('UniversityData')
export class UniversityData {
    @JsonProperty('descriptionUniversity')
    descriptionUniversity: string = undefined;
    @JsonProperty('facilitiesUniversity')
    facilitiesUniversity: string[] = [];
    @JsonProperty('facultiesUniversity')
    facultiesUniversity: string[] = [];
    @JsonProperty('logoUniversity')
    logoUniversity: string = undefined;
    @JsonProperty('mission')
    mission: string = undefined;
    @JsonProperty('nameUniversity')
    nameUniversity: string = undefined;
    @JsonProperty('photosUniversity')
    photosUniversity: string = undefined;
    @JsonProperty('rating')
    rating: number = undefined;
    @JsonProperty('strategicProgram')
    strategicProgram: string[] = [];
    @JsonProperty('typeUniversity')
    typeUniversity: string = undefined;
    @JsonProperty('universityId')
    universityId: string = undefined;
    @JsonProperty('values')
    values: string[] = [];
    @JsonProperty('vision')
    vision: string = undefined;
    @JsonProperty('websiteUniversity')
    websiteUniversity: string = undefined;
    @JsonProperty('address')
    address: string = undefined;
    @JsonProperty('fax')
    fax: string = undefined;
    @JsonProperty('phone')
    phone: string = undefined;
    @JsonProperty('locality')
    locality: string = undefined;

    constructor(obj: any) {
        this.descriptionUniversity = obj ? (obj.descriptionUniversity ? obj.descriptionUniversity : '') : '';
        this.facilitiesUniversity = obj ? (obj.facilitiesUniversity ? obj.facilitiesUniversity : []) : [];
        this.facultiesUniversity = obj ? (obj.facultiesUniversity ? obj.facultiesUniversity : []) : [];
        this.logoUniversity = obj ? (obj.logoUniversity ? obj.logoUniversity : '') : '';
        this.mission = obj ? (obj.mission ? obj.mission : '') : '';
        this.nameUniversity = obj ? (obj.nameUniversity ? obj.nameUniversity : '') : '';
        this.photosUniversity = obj ? (obj.photosUniversity ? obj.photosUniversity : '') : '';
        this.rating = obj ? (obj.rating ? obj.rating : '') : '';
        this.strategicProgram = obj ? (obj.strategicProgram ? obj.strategicProgram : []) : [];
        this.typeUniversity = obj ? (obj.typeUniversity ? obj.typeUniversity : '') : '';
        this.universityId = obj ? (obj.universityId ? obj.universityId : '') : '';
        this.values = obj ? (obj.values ? obj.values : []) : [];
        this.vision = obj ? (obj.vision ? obj.vision : '') : '';
        this.websiteUniversity = obj ? (obj.websiteUniversity ? obj.websiteUniversity : '') : '';
        this.address = obj ? (obj.address ? obj.address : '') : '';
        this.fax = obj ? (obj.fax ? obj.fax : '') : '';
        this.phone = obj ? (obj.phone ? obj.phone : '') : '';
        this.locality = obj ? (obj.locality ? obj.locality : '') : '';
    }
}
