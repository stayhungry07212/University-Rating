import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DoughnutData } from 'src/app/models/DoughnutData';

@Component({
  selector: 'app-doughnut-widget',
  templateUrl: './doughnut-widget.component.html',
  styleUrls: ['./doughnut-widget.component.scss']
})
export class DoughnutWidgetComponent implements OnInit, OnChanges {

  @Input() data: DoughnutData;
  chartData;
  myOptions = {
    colors: ['#4fa7c9', '#3d639f', '#2b1c74'],
    is3D: false,
    title: ''
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
