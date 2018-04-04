import { Component, OnInit } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';

import { Purchase } from "../../models/purchase"

import { Configuration } from "../../app.configuration"

@Component({
  selector: 'app-exchange-handler',
  templateUrl: './exchange-handler.component.html',
  styleUrls: ['./exchange-handler.component.css']
})
export class ExchangeHandlerComponent implements OnInit {

  public usdBalance: number;
  public purchase: Purchase;
  public configuration: Configuration
  public usd: number;
  public btc: any
  public eth: any
  public xrp: any

  constructor(private _cryptoService: CryptoService) { }

  ngOnInit() {
    this.purchase = new Purchase();
    this.purchase.Amount = 0;
    this.purchase.Symbol = "BTC";
    this.reset();
    this._cryptoService.account().subscribe(data => {
      this.usd = data["usd"];
      this.btc = data["btc"];
      this.eth = data["eth"];
      this.xrp = data["xrp"];
    })
  }

  public trade(): void {
    this._cryptoService.trade(this.purchase)
      .subscribe(data => {
        this._cryptoService.account().subscribe(data => {
          this.usd = data["usd"];
          this.btc = data["btc"];
          this.eth = data["eth"];
          this.xrp = data["xrp"];
        })
      });
  }

  public reset(): void {
    this._cryptoService.reset().subscribe(data => {
      this._cryptoService.account().subscribe(data => {
        this.usd = data["usd"];
        this.btc = data["btc"];
        this.eth = data["eth"];
        this.xrp = data["xrp"];
      })

    });

  }
}
