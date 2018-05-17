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

  constructor(private _cryptoService: CryptoService) { }

  private dateFormat(date: string): void {
    let _temp = new Date(date);
    date = _temp.toLocaleTimeString("hu-HU");
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

        let dates: string[] = new Array<string>();
        for (var i = 0; i < obj.length; i++) {
          // Collect dates
          let _dateTemp: string = obj[i].createdAt;
          this.dateFormat(_dateTemp);
          dates.push(_dateTemp);
        }
        // Sort dates
        dates = dates.sort();

        let labels: string[] = new Array<string>();

        // Collect hourly labels
        for (var i = 1; i < dates.length; i++) {
          let _currentDate = new Date(dates[i]);
          let _nextDate = new Date(dates[i++]);
          if ((_currentDate.getDay() == _nextDate.getDay()) && (_currentDate.getHours() == _nextDate.getHours())) {
            this.dateFormat(dates[i]);
            labels.push(dates[i]);
          }
        }

        let btc: number[] = new Array<number>();
        let eth: number[] = new Array<number>();
        let usd: number[] = new Array<number>();
        let xrp: number[] = new Array<number>();
         // TODO Implement this
        let idx: number = 0;
        //while (idx < dates.length) {
        //  let left = new Date(labels[i]);
        //  let right = new Date(labels[i]);
        //  if (obj.) {
        //  }

        
        this.chart = new Chart("history", {
          type: 'line',
          data: {
            //labels: dates,
            datasets: [
              {
                //data: prices,
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
        console.log("API error - History");
      }
      );
  }
}
