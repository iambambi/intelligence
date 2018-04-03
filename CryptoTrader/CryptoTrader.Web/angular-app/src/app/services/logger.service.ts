import { Injectable } from '@angular/core';
import { Configuration } from '../app.configuration';

@Injectable()
export class LoggerService {
  // Defines functionalities to track the responses that the application receives from the api controller

  constructor(private _config: Configuration) { }

  public debug(message: string, obj?: any): void {
    // Only development mode!
    if (!this._config.IsDevEnvironment)
      return;

    if (obj) {
      console.log(message, obj);
    }
    else {
      console.log(message);
    }
  }

  public error(message: string, obj?: any): void {
    if (obj) {
      console.error(message, obj);
    }
    else {
      console.error(message);
    }
  }
}
