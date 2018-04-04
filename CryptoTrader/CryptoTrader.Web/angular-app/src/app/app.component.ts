import { Component } from '@angular/core';
import { CryptoService } from './crypto.service';
import { Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  chart = [];
  chart2 = [];
  chart3 = [];

  constructor(private _crypto: CryptoService){}

  ngOnInit(){
    this._crypto.dailyBTC().subscribe(res => {
      console.log(res['symbol'])
      let temp_1= res['history']
      JSON.stringify(temp_1,null,"  ")
      let listPrice = JSON.stringify(temp_1,null,"  ").toString().split(',',462)
      let tmb =[]
      listPrice.forEach(element => {
        tmb.push(element.split(': ',2))
      });
      let prices=[]
      let i = 0
      for (let index = tmb.length-1; index > 0; index--) {
        
        prices.push(+tmb[index][1])
      }
      let dates=[]
      
      for (let index = tmb.length-1; index > 0; index--) {
        
        dates.push(tmb[index][0].substring(2,24))
      }
      this.chart = new Chart('canvas', {
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
    

    
    })

    this._crypto.dailyETH().subscribe(res => {
      console.log(res['symbol'])
      let temp_12= res['history']
      JSON.stringify(temp_12,null,"  ")
      let listPrice2 = JSON.stringify(temp_12,null,"  ").toString().split(',',462)
      let tmb2 =[]
      listPrice2.forEach(element => {
        tmb2.push(element.split(': ',2))
      });
      let prices2=[]
      for (let index = tmb2.length-1; index > 0; index--) {
        
        prices2.push(+tmb2[index][1])
      }
      let dates2=[]
      for (let index = tmb2.length-1; index > 0; index--) {
        
        dates2.push(tmb2[index][0].substring(2,24))
      }
      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: dates2,
          datasets: [
            {
              data: prices2,
              borderColor: 'red',
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
    })
    
    this._crypto.dailyXRP().subscribe(res => {
      console.log(res['symbol'])
      let temp_12= res['history']
      JSON.stringify(temp_12,null,"  ")
      let listPrice2 = JSON.stringify(temp_12,null,"  ").toString().split(',',462)
      let tmb2 =[]
      listPrice2.forEach(element => {
        tmb2.push(element.split(': ',2))
      });
      let prices2=[]
      for (let index = tmb2.length-1; index > 0; index--) {
        
        prices2.push(+tmb2[index][1])
      }
      let dates2=[]
      for (let index = tmb2.length-1; index > 0; index--) {
        
        dates2.push(tmb2[index][0].substring(2,24))
      }
      this.chart3 = new Chart('canvas3', {
        type: 'line',
        data: {
          labels: dates2,
          datasets: [
            {
              data: prices2,
              borderColor: 'black',
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
    })
    
  }
}
