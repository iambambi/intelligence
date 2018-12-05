import { Component, OnInit } from '@angular/core';

import { CryptoService } from "../../services/crypto.service";
import { LoggerService } from '../../services/logger.service';

import { Chart } from 'chart.js';
import { HistoryObj } from '../../models/historyObj';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public chart: any = [];
  public actualPrice: number;
  public isValidChart: boolean = true;
  public historyChart: string = "historyChart";

  constructor(private _cryptoService: CryptoService) { }

  private dateFormat(date: string): void {
    let _temp = new Date(date);
    date = _temp.toLocaleDateString("hu-HU");
  }

  ngOnInit() {
    this._cryptoService.history()
      .subscribe(res => {
        let obj: HistoryObj[] = Object.values(res);

        // Check existence of data
        // Symbol and exchangeRates is nullable because of reset!
        if (!obj || obj.length <= 0) {
          this.isValidChart = false;
          return false;
        }

        let labels: string[] = new Array<string>();

        let btc: number[] = new Array<number>();
        let eth: number[] = new Array<number>();
        let usd: number[] = new Array<number>();
        let xrp: number[] = new Array<number>();

        for (var i = 0; i < obj.length; i++) {
          let _dateTemp: string = obj[i].createdAt;
          this.dateFormat(_dateTemp);
          labels.push(_dateTemp);

          btc.push(obj[i].balance["btc"] ? obj[i].balance["btc"] : 0);
          eth.push(obj[i].balance["eth"] ? obj[i].balance["eth"] : 0);
          usd.push(obj[i].balance["usd"]) ? obj[i].balance["usd"] : 0;
          xrp.push(obj[i].balance["xrp"]) ? obj[i].balance["xrp"] : 0;
        }

        if (labels) {
          this.chart = new Chart(this.historyChart, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  data: btc,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  data: eth,
                  borderColor: '#092850',
                  fill: false
                },
                {
                  data: usd,
                  borderColor: '#10983b',
                  fill: false
                },
                {
                  data: xrp,
                  borderColor: '#971098',
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
        }
        else {
          this.isValidChart = false;
        }
      },
      err => {
        console.log("API error - History");
      }
      );
  }
}
