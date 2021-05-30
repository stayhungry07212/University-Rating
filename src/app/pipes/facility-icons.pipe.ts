import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facilityIcons'
})
export class FacilityIconsPipe implements PipeTransform {

  transform(value: any): any {
    return `assets/facilities/${value}.svg`;
  }

}
