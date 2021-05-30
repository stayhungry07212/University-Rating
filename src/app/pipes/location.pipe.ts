import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: any): any {
    return Array.isArray(value) ? value[0] : value;
  }

}
