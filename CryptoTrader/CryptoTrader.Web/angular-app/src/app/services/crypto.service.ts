import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Configuration } from "../app.configuration";
import { LoggerService } from './logger.service';

import { Trade } from '../models/trade';

@Injectable()
export class CryptoService {

  private options = {
    headers: new HttpHeaders({
      'X-Access-Token': this._config.CryptoAPIKey,
      "Content-Type": "application/json"
    })
  }

  constructor(
    private _http: HttpClient,
    private _config: Configuration,
    private _logger: LoggerService) { }

  public daily(currency: string) {
    return this._http.get(`${this._config.CryptoAPIUrl}/${currency}`, this.options);
  }

  public trade(bodyContent: Trade) {
    var jsonBodyContent = JSON.stringify({
      "Symbol": bodyContent.targetCurrency.symbol.toUpperCase(),
      "Amount": bodyContent.amount
    });
    return this._http.post(this._config.CryptoPurchaseUrl, jsonBodyContent, this.options);
  }

  public reset() {
    return this._http.post(this._config.CryptoResetUrl, "", this.options);
  }

  public account() {
    return this._http.get(this._config.CryptoAccountUrl, this.options);
  }

  public history() {
    return this._http.get(this._config.CryptoHistoryUrl, this.options);
  }

  private handleError(error: any) {
    this._logger.error("", error);

    return Observable.throw(error.message);
  }
}
