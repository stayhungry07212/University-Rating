import { TestBed } from '@angular/core/testing';

import { AzureAiTextAnalysisService } from './azure-ai-text-analysis.service';

describe('AzureAiTextAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzureAiTextAnalysisService = TestBed.get(AzureAiTextAnalysisService);
    expect(service).toBeTruthy();
  });
});
