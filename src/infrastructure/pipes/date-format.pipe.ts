import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      return value.toString();
    }
    return '';
  }
}
