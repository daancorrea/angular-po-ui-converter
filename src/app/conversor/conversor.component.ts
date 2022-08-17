import { Component, OnInit } from '@angular/core';
import { PoMultiselectOption } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {
  constructor(private http: HttpClient) { }

  apiURL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL";
  dollar: any;
  dollarConverted: any;
  euro: any;;
  euroConverted: any;
  selectValue: string = "";
  inputValue: number = 0;
  currencyValues: Array<string> = [];
  options: Array<PoMultiselectOption> = [
    { value: 'dolar', label: 'Dólar' },
    { value: 'euro', label: 'Euro' }
  ];
  onSelectChange(event: any) {
    this.selectValue = event
  };
  changeOptions(event: any): void {
    this.currencyValues = event.selectedOptions.map((option: any) => option.value);
    this.currencyValues.map(i => {
      if (i == 'dolar') {
        this.dollarConverted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(this.inputValue * Number(this.dollar));
      }
      if (i == 'euro') {
        this.euroConverted = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(this.inputValue * Number(this.euro));
      }
    })
  };
  onInputChange(event: string) {
    this.inputValue = Number(event)
  }
  getCurrencyValuesToday() {
    return this.http.get(this.apiURL)
      .subscribe((result) => {
        this.dollar = (result as any).USDBRL.bid
        this.euro = (result as any).EURBRL.bid
      });
  };

  ngOnInit(): void {
    this.getCurrencyValuesToday();
  };
}
