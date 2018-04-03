import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';

import { Configuration } from '../app.configuration';
import { LoggerService } from './logger.service';

import { ApiResponse } from '../models/apiresponse';


@Injectable()
export class DataService {

  constructor(
    private _http: Http,
    private _config: Configuration,
    private _logger: LoggerService
  ) { }
  
  public getAll<T>(action: string): Observable<ApiResponse<Array<T>>> {
    const headers = this.setHeaders();

    return this._http
      .get(this._config.ServerWithApiUrl + action, { headers: headers })
      .map<Response, ApiResponse<Array<T>>>(res => res.json())
      .catch(error => this.handleError(error));
  }

  public create<T>(action: string, item: T): Observable<ApiResponse<T>> {
    const headers = this.setHeaders();
    const toAdd = JSON.stringify(item);

    return this._http.post(this._config.ServerWithApiUrl + action, toAdd, { headers: headers })
      .map<Response, ApiResponse<T>>(res => res.json())
      .catch(error => this.handleError(error));
  }

  public update<T>(action: string, item: T): Observable<ApiResponse<T>> {
    const headers = this.setHeaders();
    const toUpdate = JSON.stringify(item);

    return this._http.put(this._config.ServerWithApiUrl + action, toUpdate, { headers: headers })
      .map<Response, ApiResponse<T>>(res => res.json())
      .catch(error => this.handleError(error));
  }

  public delete<T>(action: string, id: string): Observable<ApiResponse<T>> {
    const headers = this.setHeaders();

    return this._http.delete(`${this._config.ServerWithApiUrl}${action}/${id}`, { headers: headers })
      .map<Response, ApiResponse<T>>(res => res.json())
      .catch(error => this.handleError(error));
  }

  private setHeaders(): Headers {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    return headers;
  }

  private handleError(error: any) {
    this._logger.error("", error);

    return Observable.throw(error.message);
  }
}
