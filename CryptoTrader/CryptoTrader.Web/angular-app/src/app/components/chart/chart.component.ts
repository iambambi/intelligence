import { Component, OnInit, Input } from '@angular/core';

import { CryptoService } from "../../services/crypto.service";

import { Chart } from 'chart.js';
import { ExchangeObj } from '../../models/exchangeObj';
import { LoggerService } from '../../services/logger.service';

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
  public isValidChart: boolean = true;

  constructor(private _cryptoService: CryptoService) { }

  private dateFormat(dates: string[]): void {
    for (var i = 0; i < dates.length; i++) {
      let _temp = new Date(dates[i]);
      dates[i] = _temp.toLocaleDateString("hu-HU");
    }
  }

  ngOnInit() {
    this._cryptoService.daily(this.cryptoCurrencySym)
      .subscribe(res => {
        let obj: ExchangeObj = JSON.parse(JSON.stringify(res));

        // Check existence of data
        if (!obj || !obj.history || obj.history.length <= 0 || !obj.currentRate || !obj.symbol) {
          this.isValidChart = false;
          return false;
        }

        let dates = Object.keys(obj.history);
        let prices = Object.values(obj.history);

        // Date formatting
        this.dateFormat(dates);

        // Set the actual price
        this.actualPrice = obj.currentRate;

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
        });
      },
      err => {
        console.log("API error - Purchase");
      }
    );
  }
}
