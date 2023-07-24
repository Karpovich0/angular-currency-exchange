import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currency1: string = '';
  currency2: string = '';
  result: number = 0;

  // Calculate(val1: string, val2: string) {
  //   this.result = +val1 + +val2;
  // }
  Total() {
    this.result = +this.currency1 + +this.currency2;
  }
  constructor() {}
  ngOnInit(): void {}
}
