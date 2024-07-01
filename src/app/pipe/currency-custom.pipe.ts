import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom',
  standalone: true
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return '$'+value.toFixed(2);
  }

}
