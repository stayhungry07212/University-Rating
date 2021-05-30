import { Injectable } from '@angular/core';
import { TextAnalyticsClient, TextAnalyticsApiKeyCredential } from '@azure/ai-text-analytics';

const key = '2e1ffec2d1f347a787bec6dbbf17fe0a';
const endpoint = `https://universityrating.cognitiveservices.azure.com/`;
const client = new TextAnalyticsClient(endpoint, new TextAnalyticsApiKeyCredential(key));

@Injectable({
  providedIn: 'root'
})
export class AzureAiTextAnalysisService {

  constructor() { }

  sentimentAnalysis(text: string) {
    return client.analyzeSentiment([text]);
  }

}
