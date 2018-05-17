import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CryptoService } from './services/crypto.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { Configuration } from './app.configuration';
import { ExchangeHandlerComponent } from './components/exchange-handler/exchange-handler.component';
import { LoggerService } from './services/logger.service';
import { DataService } from './services/data.service';
import { HistoryComponent } from './components/history/history.component';

let providers = {
  "facebook": {
    "clientId": "246237042779563",
    "apiVersion": "v2.4"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ExchangeHandlerComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Configuration,
    LoggerService,
    CryptoService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
