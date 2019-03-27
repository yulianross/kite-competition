import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.html'
})
export class LineChartComponent implements OnInit {

  @Input('title') title: string = "";
  @Input('data') data: Array<any>;
  @Input('labelX') labelX: string = "";
  @Input('subtitle') subtitle: string = "";

  Highcharts: any;
  chartOptions: any;

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },
      series: [{
        name: '',
        data: this.parseData(this.data),
        type: 'spline'
      }],
      xAxis: {
        title: {
          text: this.labelX
        }
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      boost: {
        useGPUTranslations: true,
        usePreallocated: true
      },
      colors: ['#09b1c7'],
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subtitle
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          animation: {
            duration: 1800
          }
        }
      }
    };
  }

  private parseData(data) {
    return data.map((experience) => {
      return [experience.x, experience.y];
    })
  }
}
