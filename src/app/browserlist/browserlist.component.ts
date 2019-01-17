import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-browserlist',
  templateUrl: './browserlist.component.html',
  styleUrls: ['./browserlist.component.scss']
})
export class BrowserlistComponent implements OnInit {
  @Input() data: any[];
  @Input() level: String;
  @Output() selectedItem = new EventEmitter<any>();

  selFolder = {};

  constructor() {}

  ngOnInit() {}

  clickedItem(folder, index) {
    this.selFolder = folder;
    this.selectedItem.emit({
      item: folder,
      level: this.level
    });
  }
}
