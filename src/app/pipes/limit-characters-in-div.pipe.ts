import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharactersInDiv'
})
export class LimitCharactersInDivPipe implements PipeTransform {

  transform(value: string, charMaxSize: number): any {
    return value.length > charMaxSize ? value.substr(0,charMaxSize - 1) + '...' : value;
  }

}
