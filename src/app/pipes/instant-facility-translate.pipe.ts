import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'instantFacilityTranslate'
})
export class InstantFacilityTranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: any): any {
    return this.translate.instant(`filters.keywords.facilities.${value}`);
  }

}
