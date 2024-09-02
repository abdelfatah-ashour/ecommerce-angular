import { Pipe, PipeTransform } from '@angular/core';
type CurrencyCode =
  | 'USD' // US Dollar
  | 'EUR' // Euro
  | 'JPY' // Japanese Yen
  | 'GBP' // British Pound
  | 'AUD' // Australian Dollar
  | 'CAD' // Canadian Dollar
  | 'CHF' // Swiss Franc
  | 'CNY' // Chinese Yuan
  | 'SEK' // Swedish Krona
  | 'NZD' // New Zealand Dollar
  | 'EGP'; // Om El Donia

/*
 * There built-in Pipe for currency.
 * */
@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number, currencyCode: CurrencyCode = 'USD'): string {
    return `${this.getCurrencySymbol(currencyCode)} ${Number(value).toFixed(2)}`;
  }

  private getCurrencySymbol(code: CurrencyCode): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
    });
    const formatted = formatter.format(0);
    const symbol = formatted.replace(/\d/g, '').trim();
    return symbol.endsWith('.') ? symbol.slice(0, -1).trim() : symbol;
  }
}
