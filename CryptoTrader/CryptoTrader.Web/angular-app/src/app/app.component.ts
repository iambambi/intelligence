import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { CryptoService } from "./services/crypto.service";
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public currencies: Currency[] = new Array<Currency>();

  constructor(
    private _cryptoService: CryptoService,
  ) { }

  ngOnInit() {
    this._cryptoService.account().subscribe(data => {
      let currencyNames: string[] = Object.values(data);
      let currencyValues: string[] = Object.keys(data);

      // Check existence (1 because of 'token')
      if (!currencyNames || !currencyNames || currencyNames.length <= 1 || currencyValues.length <= 1 || currencyValues.length != currencyNames.length)
        return false;

      // Make data conversion
      this.convertToCurrencyArray(currencyValues, currencyNames);
    })
  }

  private convertToCurrencyArray(currencyNames: string[], currencyValues: string[]): void {
    // Remove the token from model
    let indexOfToken = currencyNames.indexOf('token');

    if (indexOfToken !== -1) {
      currencyNames.splice(indexOfToken, 1);
      currencyValues.splice(indexOfToken, 1);
    }

    // Make trade object
    for (var i = 0; i < currencyValues.length; i++) {
      let _temp = new Currency();
      _temp.amount = currencyValues[i] && parseInt(currencyValues[i]) ? parseInt(currencyValues[i]) : 0;
      _temp.symbol = currencyNames[i] ? currencyNames[i].toUpperCase() : "";
      _temp.name = this.GetCurrencyName(_temp.symbol);
      if (_temp) {
        this.currencies.push(_temp);
      }
    }
  }

  private GetCurrencyName(symbol: string): any {
    switch (symbol.toUpperCase()) {
      case "BTC":
        return "Bitcoin";
      case "ETH":
        return "Ethereum";
      case "XRP":
        return "Ripple";
      case "USD":
        return "USA Dollar";
      default:
        return "Undefined";
    }
  }
}
