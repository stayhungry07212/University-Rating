import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('UserData')
export class UserData {
    @JsonProperty('birthday')
    birthday: string = undefined;
    @JsonProperty('classLevel')
    classLevel: string = undefined;
    @JsonProperty('email')
    email: string = undefined;
    @JsonProperty('gdpr')
    gdpr: boolean = undefined;
    @JsonProperty('image')
    image: string = undefined;
    @JsonProperty('locality')
    locality: string = undefined;
    @JsonProperty('name')
    name: string = undefined;
    @JsonProperty('requestId')
    requestId: string = undefined;
    @JsonProperty('schoolLevel')
    schoolLevel: string = undefined;
    @JsonProperty('sex')
    sex: string = undefined;
    @JsonProperty('surname')
    surname: string = undefined;
    @JsonProperty('type')
    type: string = undefined;

    constructor(obj: any) {
        this.birthday = obj ? (obj.birthday ? obj.birthday : undefined) : undefined;
        this.classLevel = obj ? (obj.classLevel ? obj.classLevel : undefined) : undefined;
        this.email = obj ? (obj.email ? obj.email : undefined) : undefined;
        this.gdpr = obj ? (obj.gdpr ? obj.gdpr : false) : false;
        this.image = obj ? (obj.image ? obj.image : undefined) : undefined;
        this.locality = obj ? (obj.locality ? obj.locality : undefined) : undefined;
        this.name = obj ? (obj.name ? obj.name : undefined) : undefined;
        this.requestId = obj ? (obj.requestId ? obj.requestId : undefined) : undefined;
        this.schoolLevel = obj ? (obj.schoolLevel ? obj.schoolLevel : undefined) : undefined;
        this.sex = obj ? (obj.sex ? obj.sex : undefined) : undefined;
        this.surname = obj ? (obj.surname ? obj.surname : undefined) : undefined;
        this.type = obj ? (obj.type ? obj.type : undefined) : undefined;
    }
}
