import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: string | any): string {

    if (value !== null && value !== undefined && !isNaN(Number(value))) {
      const numericValue = Math.round(Number(value));
      const numericValueAsString = numericValue.toString();
      let length = numericValueAsString.length;
      let result = '';
      while (length > 3) {
        result += ' ';
        result += numericValueAsString.slice(length - 3, length);
        length -= 3;
      }
      return (numericValueAsString.slice(0, length) + result + ' zł');
    }
    return 'błąd'

  }

}
