import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {

  public get IsDevEnvironment(): boolean {
    return window.location.host === "localhost:5000";
  }

  public get CryptoAPIKey(): string {
    return "CA8ADFB3-B05C-40F2-82DF-57F353726778";
  }

  // Returns the api root url, that is defined in the controller
  public ServerWithApiUrl = `${this.Server}/api/`;
  public CryptoAPIUrl = "https://obudai-api.azurewebsites.net/api/exchange";
  public CryptoPurchaseUrl = "https://obudai-api.azurewebsites.net/api/account/purchase";
  public CryptoResetUrl = "https://obudai-api.azurewebsites.net/api/account/reset";
  public CryptoAccountUrl = "https://obudai-api.azurewebsites.net/api/account";

  private get Server(): string {
    if (window.location.host === "localhost:5000") {
      return "http://localhost:5000";
    }
    return `${window.location.protocol}//${window.location.host}`;
  }
}
