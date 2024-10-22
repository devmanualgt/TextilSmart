import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FnData, TblInformation } from 'src/app/models/tbl-information.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() tblInfo: TblInformation;
  @Input() tblData: any[];
  @Output() btnAction = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  async newEvent(data: FnData) {
    this.btnAction.emit(data);
  }
}
