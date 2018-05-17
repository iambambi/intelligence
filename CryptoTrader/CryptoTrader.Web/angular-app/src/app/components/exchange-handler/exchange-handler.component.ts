import { Component, OnInit } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';

import { Currency } from '../../models/currency';
import { Trade } from '../../models/trade';

import { Configuration } from "../../app.configuration"

@Component({
  selector: 'app-exchange-handler',
  templateUrl: './exchange-handler.component.html',
  styleUrls: ['./exchange-handler.component.css']
})
export class ExchangeHandlerComponent implements OnInit {
  public usdBalance: number;
  public configuration: Configuration;
  public currencies: Currency[] = new Array<Currency>();
  public tradeModel: Trade;
  public selectedCurrencyName: string;

  constructor(private _cryptoService: CryptoService) { }

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

  private GetCurrencyByName(name: string): any {
    let result;
    let currencyArray = this.currencies;
    for (var i = 0; i < currencyArray.length; i++) {
      if (currencyArray[i].symbol == name) {
        return currencyArray[i];
      }
    }
    return false;
  }

  ngOnInit() {
    this.tradeModel = new Trade();

    // Reset the datamodel
    // this.reset();

    this._cryptoService.account().subscribe(data => {
      let currencyNames: string[] = Object.values(data);
      let currencyValues: string[] = Object.keys(data);

      // Check existence (1 because of 'token')
      if (!currencyNames || !currencyNames || currencyNames.length <= 1 || currencyValues.length <= 1 || currencyValues.length != currencyNames.length)
        return false;

      // Make data conversion
      this.convertToCurrencyArray(currencyValues, currencyNames);

      // Set data
      this.selectedCurrencyName = this.currencies[0].name;
    })
  }

  public trade(): void {
    this.tradeModel.targetCurrency = this.GetCurrencyByName(this.selectedCurrencyName);

    this._cryptoService.trade(this.tradeModel)
      .subscribe(data => {
        this._cryptoService.account().subscribe(data => {
          let currencyNames: string[] = Object.values(data);
          let currencyValues: string[] = Object.keys(data);
          this.currencies = new Array<Currency>();

          // Check existence (1 because of 'token')
          if (!currencyNames || !currencyNames || currencyNames.length <= 1 || currencyValues.length <= 1 || currencyValues.length != currencyNames.length)
            return false;
          
          // Make data conversion
          this.convertToCurrencyArray(currencyValues, currencyNames);

          // Set data
          this.selectedCurrencyName = this.currencies[0].name;
        })
      });
  }

  public reset(): void {
    this._cryptoService.reset().subscribe(data => {
      this._cryptoService.account().subscribe(data => {
        let currencyNames: string[] = Object.values(data);
        let currencyValues: string[] = Object.keys(data);
        this.currencies = new Array<Currency>();

        // Check existence (1 because of 'token')
        if (!currencyNames || !currencyNames || currencyNames.length <= 1 || currencyValues.length <= 1 || currencyValues.length != currencyNames.length)
          return false;

        // Make data conversion
        this.convertToCurrencyArray(currencyValues, currencyNames);

        // Set data
        this.selectedCurrencyName = this.currencies[0].name;
      })
    });
  }
}
