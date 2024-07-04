import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom',
  standalone: true
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$', fractionDigits: number = 2): unknown {
    return currencySymbol+value.toFixed( fractionDigits);
  }

}
