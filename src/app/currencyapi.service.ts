import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CurrencyapiService {
  constructor(private http: HttpClient) {}

  getCurrencyData() {
    let url =
      'https://api.currencyapi.com/v3/latest?apikey=cur_live_fXvJstm8BxlecIFUsdDy1i5ulsfsuet03Au3Aw20&currencies=EUR%2CUSD%2CUAH%2CPLN&base_currency=UAH';
    return this.http.get(url);
  }
}
