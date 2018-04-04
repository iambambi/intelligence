import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Configuration } from "../app.configuration";

import { Purchase } from "../models/purchase";

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
    private _config: Configuration) { }

  public daily(currency: string) {
    return this._http.get(`${this._config.CryptoAPIUrl}/${currency}`, this.options);
  }

  public trade(bodyContent: Purchase) {
    var jsonBodyContent = JSON.stringify(bodyContent);
    return this._http.post(this._config.CryptoPurchaseUrl, jsonBodyContent, this.options);
  }

  public reset() {
    return this._http.post(this._config.CryptoResetUrl,"", this.options);
  }

  public account() {
    return this._http.get(this._config.CryptoAccountUrl, this.options);
  }
}
