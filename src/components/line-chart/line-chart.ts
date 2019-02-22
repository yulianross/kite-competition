import { Component, Input, OnInit } from '@angular/core';
import * as utils from '../../utils/utils';

@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.html'
})
export class LineChartComponent implements OnInit {

  @Input('data') data : Array<any>;
  @Input('legend') legend : string = "";
  @Input('labelX') labelX : string = "";
  @Input('title') title : string = "";

  // lineChart variables
  private lineChartData:Array<any>;
  private lineChartLabels:Array<any>;
  private lineChartOptions:any;
  private lineChartColors:Array<any>;
  private lineChartLegend:boolean;
  private lineChartType:string = 'line';

  constructor() {

  }

  ngOnInit() {
    
    this.lineChartData = [{
      data: this.data, 
      label: this.legend
    }];

    this.lineChartOptions = {
      responsive: true,
      title: {
        display: this.title || false,
        text: this.title
      },
      scaleShowVerticalLines: true,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: utils.getMaxAltitude(this.data),
            stepSize: Math.round(utils.getMaxAltitude(this.data)/3)
          }
        }],
        xAxes: [{
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: this.labelX
          },
          
          ticks: {
            min: 0,
            max: this.data[this.data.length - 1].x,
            stepSize: Math.round(this.data[this.data.length - 1].x/7)
          }
        }] 
      }
    };

    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(9,177,199,0.2)',
        borderColor: '#09b1c7',
        pointBackgroundColor: '#09b1c7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    this.lineChartLegend = this.legend !== "" || false;
  }
}
