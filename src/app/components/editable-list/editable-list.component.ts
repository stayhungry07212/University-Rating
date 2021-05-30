import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableListComponent implements OnInit {

  @Input() editable: boolean;
  @Input() list: Array<string>;
  text: string;
  enabledAddingNewItem: boolean;
  @Output() listEdited = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.list.push(this.text);
    this.text = '';
    this.listEdited.emit(this.list);
  }

  remove(item: string) {
    const index = this.list.indexOf(item);
    this.list.splice(index, 1);
    this.listEdited.emit(this.list);
  }

}
