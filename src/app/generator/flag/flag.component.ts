import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FlagModel } from '../../shared/models/flag-model';

@Component({
  selector: 'seeya-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  @Input() flag: FlagModel;
  @Output() flagRemovedEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteFlag(): void {
    this.flagRemovedEvent.emit(this.flag.id);
  }

}
