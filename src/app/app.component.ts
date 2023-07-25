import { Component, OnInit } from '@angular/core';
import { CurrencyapiService } from './currencyapi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  eur: string = '';
  usd: string = '';
  pln: string = '';

  lastInput: number = 0;

  base1: string = 'UAH';
  base2: string = 'USD';
  basesCoefficient: number = 1;
  currencyInput1: string = '';
  currencyInput2: string = '';
  currency1: string = '';
  currency2: string = '';
  ratesArray: any = [];

  changeBase(base: string, select: number) {
    switch (select) {
      case 1:
        this.base1 = base;
        this.calculateBaseCoeficient();
        this.lastInput === 1
          ? this.calculateCurrencyTwo()
          : this.calculateCurrencyOne();

        break;
      case 2:
        this.base2 = base;
        this.calculateBaseCoeficient();
        this.lastInput === 2
          ? this.calculateCurrencyOne()
          : this.calculateCurrencyTwo();
        break;
      default:
        break;
    }
  }

  // calculate ratio between currencies
  calculateBaseCoeficient() {
    let coefficient1 = +this.ratesArray.data[this.base1].value;
    let coefficient2 = +this.ratesArray.data[this.base2].value;
    this.basesCoefficient = coefficient2 / coefficient1;
  }

  calculateCurrencyOne() {
    //input validation
    if (isNaN(+this.currencyInput2)) {
      this.currencyInput2 = this.currency2;
      return;
    } else {
      this.currency2 = this.currencyInput2;
      this.lastInput = 2;
    }
    //round result value
    let res = +this.currency2 / this.basesCoefficient;
    res = Math.round((res + Number.EPSILON) * 100) / 100;
    //result value validation
    if (res === 0) {
      this.currency1 = '';
      this.currencyInput1 = '';
    } else {
      this.currency1 = res.toString();
      this.currencyInput1 = res.toString();
    }
  }
  calculateCurrencyTwo() {
    //input validation
    if (isNaN(+this.currencyInput1)) {
      this.currencyInput1 = this.currency1;
      return;
    } else {
      this.currency1 = this.currencyInput1;
      this.lastInput = 1;
    }
    //round result value
    let res = +this.currency1 * this.basesCoefficient;
    res = Math.round((res + Number.EPSILON) * 100) / 100;
    //result value validation
    if (res === 0) {
      this.currency2 = '';
      this.currencyInput2 = '';
    } else {
      this.currency2 = res.toString();
      this.currencyInput2 = res.toString();
    }
  }

  getRates() {
    // get exchange rates for currencies
    this.currency.getCurrencyData().subscribe((data) => {
      this.ratesArray = JSON.parse(JSON.stringify(data));
      this.calculateBaseCoeficient();
      this.getAllRates();
    });
  }

  getAllRates() {
    if (this.ratesArray.length === 0) {
      return;
    }
    this.eur = this.ratesArray.data.EUR.value.toFixed(4);
    this.usd = this.ratesArray.data.USD.value.toFixed(4);
    this.pln = this.ratesArray.data.PLN.value.toFixed(4);
  }
  constructor(private currency: CurrencyapiService) {}
  ngOnInit(): void {
    this.getRates();
    this.getAllRates();
  }
}
