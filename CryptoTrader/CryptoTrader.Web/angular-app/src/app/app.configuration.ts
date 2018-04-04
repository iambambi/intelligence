import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {

  public get IsDevEnvironment(): boolean {
    return window.location.host === "localhost:5000";
  }

  // Returns the api root url, that is defined in the controller
  public ServerWithApiUrl = `${this.Server}/api/`;

  private get Server(): string {
    if (window.location.host === "localhost:5000") {
      return "http://localhost:5000";
    }
    return `${window.location.protocol}//${window.location.host}`;
  }
}
