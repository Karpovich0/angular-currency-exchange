import { Component, OnInit } from '@angular/core';
import { CurrencyapiService } from './currencyapi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  base1: string = 'UAH';
  base2: string = 'UAH';
  basesCoefficient: number = 1;
  currency1: string = '';
  currency2: string = '';
  result: number = 0;
  ratesArray: any = [];

  changeBase(base: string, select: number) {
    console.log('Base change', base);

    switch (select) {
      case 1:
        this.base1 = base;
        this.calculateCurrencyTwo();
        break;
      case 2:
        this.base2 = base;
        this.calculateCurrencyOne();
        break;
      default:
        break;
    }
    this.calculateBaseCoeficient();
  }

  Total() {
    this.result = +this.currency1 + +this.currency2;
  }

  calculateBaseCoeficient() {
    let coefficient1 = +this.ratesArray.data[this.base1].value;
    let coefficient2 = +this.ratesArray.data[this.base2].value;
    console.log(coefficient1);
    console.log(coefficient2);
    this.basesCoefficient = coefficient2 / coefficient1;
    console.log(this.basesCoefficient, '- coefficient');
  }

  calculateCurrencyOne() {
    if (isNaN(+this.currency1)) return;
    let res = +this.currency2 / this.basesCoefficient;
    res = Math.round((res + Number.EPSILON) * 100) / 100;
    if (res === 0) {
      this.currency1 = '';
    } else {
      this.currency1 = res.toString();
    }
  }
  calculateCurrencyTwo() {
    if (isNaN(+this.currency1)) return;
    let res = +this.currency1 * this.basesCoefficient;
    res = Math.round((res + Number.EPSILON) * 100) / 100;
    if (res === 0) {
      this.currency2 = '';
    } else {
      this.currency2 = res.toString();
    }
  }

  // getRates() {
  //   this.currency.getCurrencyData().subscribe((data) => {
  //     this.ratesArray = JSON.parse(JSON.stringify(data));
  //   });
  // }
  constructor(private currency: CurrencyapiService) {}
  ngOnInit(): void {
    this.currency.getCurrencyData().subscribe((data) => {
      this.ratesArray = JSON.parse(JSON.stringify(data));
      this.calculateBaseCoeficient();
    });
  }
}
