import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'instantSchoolLevelTranslate'
})
export class InstantSchoolLevelTranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: string): any {
    return this.translate.instant(`filters.keywords.schoolLevel.${value}`);
  }

}
