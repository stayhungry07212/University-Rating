import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('DoughnutData')
export class DoughnutData {
    @JsonProperty('id')
    values: Array<Array<any>> = undefined;
    @JsonProperty('title')
    title: string = undefined;

    constructor(obj: any) {
        this.values = obj ? (obj.values ? obj.values : undefined) : undefined;
        this.title = obj ? (obj.title ? obj.title : undefined) : undefined;
    }
}
