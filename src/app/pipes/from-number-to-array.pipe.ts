import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromNumberToArray'
})
export class FromNumberToArrayPipe implements PipeTransform {

  transform(value: string): Array<any> {
    return value ? [...Array(parseInt(value))] : [];
  }

}
