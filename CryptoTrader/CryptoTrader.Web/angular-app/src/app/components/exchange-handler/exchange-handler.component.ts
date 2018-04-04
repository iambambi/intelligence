import { Component, OnInit } from '@angular/core';

import { CryptoService } from '../../services/crypto.service';

import { Purchase } from "../../models/purchase"

@Component({
  selector: 'app-exchange-handler',
  templateUrl: './exchange-handler.component.html',
  styleUrls: ['./exchange-handler.component.css']
})
export class ExchangeHandlerComponent implements OnInit {

  public usdBalance: number;
  public purchase: Purchase;

  constructor(private _cryptoService: CryptoService) { }

  ngOnInit() {
    this.purchase = new Purchase();
    this.purchase.Amount = 0;
    this.purchase.Symbol = "BTC";
    this.reset();
  }

  public trade(): void {
    this._cryptoService.trade(this.purchase)
      .subscribe(data => {
        //get balance
      });
  }

  public reset(): void {
    //api call to implement in service and subscribe to observable
  }
}
