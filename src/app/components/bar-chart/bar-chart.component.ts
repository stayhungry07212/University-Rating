import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DoughnutData } from 'src/app/models/DoughnutData';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: DoughnutData;
  chartData;
  myOptions = {
    colors: ['#1565C0', '#1976D2', '#1E88E5', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD'],
    is3D: false,
    title: '',
    legend: { position: 'none' }
  };

  constructor() { }

  ngOnInit() {
    this.createDataForDoughnut();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.createDataForDoughnut();
    }
  }

  createDataForDoughnut() {
    this.chartData = this.data ? this.data.values : null;
    this.myOptions.title = this.data ? this.data.title : null;
  }

}
