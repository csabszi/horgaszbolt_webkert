import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hufCurrency'
})
export class CurrencyPipe implements PipeTransform {
    transform(value: number): string {
        return value.toLocaleString('hu-HU') + ' Ft';
    }
}