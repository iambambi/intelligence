import { Component, OnInit, Input } from '@angular/core';

import { CryptoService } from "../../services/crypto.service";

import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() cryptoCurrencySym: string;
  @Input() cryptoCurrencyName: string;
  public chart: any = [];
  public actualPrice: number;

  constructor(private _cryptoService: CryptoService) { }

  ngOnInit() {
    this._cryptoService.daily(this.cryptoCurrencySym)
      .subscribe(res => {
        console.log(res['symbol'])
        this.actualPrice = res['currentRate'];
        let temp_1 = res['history']
        JSON.stringify(temp_1, null, "  ")
        let listPrice = JSON.stringify(temp_1, null, "  ").toString().split(',', 462)
        let tmb = []
        listPrice.forEach(element => {
          tmb.push(element.split(': ', 2))
        });
        let prices = []
        let i = 0
        for (let index = tmb.length - 1; index > 0; index--) {
          prices.push(+tmb[index][1])
        }
        let dates = []

        for (let index = tmb.length - 1; index > 0; index--) {
          dates.push(tmb[index][0].substring(4, 23))
        }
        this.chart = new Chart(this.cryptoCurrencySym, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                data: prices,
                borderColor: '#3cba9f',
                fill: false
              },

            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
      });
  }
}
