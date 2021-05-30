import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-facilities',
  templateUrl: './editable-facilities.component.html',
  styleUrls: ['./editable-facilities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableFacilitiesComponent implements OnInit {

  @Input() facilitiesList: Array<string>;
  @Input() selectedFacilities: Array<string>;
  @Input() editEnabled: boolean;
  @Output() listEdited = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addFacility(item: string) {
    this.selectedFacilities.push(item);
    this.listEdited.emit(this.selectedFacilities);
  }

  removeFacility(item: string) {
    const index = this.selectedFacilities.indexOf(item);
    this.selectedFacilities.splice(index, 1);
    this.listEdited.emit(this.selectedFacilities);
  }

  findFacility(item: string) {
    return this.selectedFacilities.includes(item);
  }

}
