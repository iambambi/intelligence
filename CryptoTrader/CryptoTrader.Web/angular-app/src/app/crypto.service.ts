import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptoService {

  constructor(private _http: HttpClient) { }

  dailyBTC() {
    return this._http.get("https://obudai-api.azurewebsites.net/api/exchange/btc", {headers: new HttpHeaders().set('X-Access-Token', 'CA8ADFB3-B05C-40F2-82DF-57F353726778')})      
    .map(result => result);
  }

  dailyETH() {
    return this._http.get("https://obudai-api.azurewebsites.net/api/exchange/eth", {headers: new HttpHeaders().set('X-Access-Token', 'CA8ADFB3-B05C-40F2-82DF-57F353726778')})      
    .map(result => result);
  }

  dailyXRP() {
    return this._http.get("https://obudai-api.azurewebsites.net/api/exchange/xrp", {headers: new HttpHeaders().set('X-Access-Token', 'CA8ADFB3-B05C-40F2-82DF-57F353726778')})      
    .map(result => result);
  }
}
