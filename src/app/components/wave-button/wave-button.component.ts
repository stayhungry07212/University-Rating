import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-wave-button',
  templateUrl: './wave-button.component.html',
  styleUrls: ['./wave-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaveButtonComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
