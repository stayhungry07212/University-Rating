import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('TextAnalyticData')
export class TextAnalyticData {
    @JsonProperty('id')
    id: string = undefined;
    @JsonProperty('statistics')
    statistics: string = undefined;
    @JsonProperty('sentiment')
    sentiment: string = undefined;

    constructor(obj: any) {
        this.id = obj ? (obj.id ? obj.id : undefined) : undefined;
        this.statistics = obj ? (obj.statistics ? obj.statistics : undefined) : undefined;
        this.sentiment = obj ? (obj.sentiment ? obj.sentiment : undefined) : undefined;
    }
}
