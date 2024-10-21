import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { FeedstockService } from '../services/feedstock.service';
import { FnData, TblInformation } from 'src/app/models/tbl-information.model';
import { tbl_list_instruction } from '../models/tbl-feedstock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFeedstockComponent } from '../add-feedstock/add-feedstock.component';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-list-feedstock',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule],
  templateUrl: './list-feedstock.component.html',
  styleUrl: './list-feedstock.component.scss',
})
export class ListFeedstockComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData: any;
  constructor(
    private feedstockService: FeedstockService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getFeedStock();
  }

  async getFeedStock() {
    this.tlbInfo = {
      tbl_name: 'Materia Prima',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_list_instruction.headers,
      rows: tbl_list_instruction.rows,
      btns: tbl_list_instruction.btn,
    };
    const getList = await this.feedstockService.getFeedStock();
    if (getList.status) {
      this.tblData = getList.data;
    }
  }

  actions(event: FnData) {
    console.log(event);
    if (event.type === 'Detalle') {
      this.openModal(event.data);
    }
  }

  openModal(data: Object) {
    const modalRef = this.modalService.open(AddFeedstockComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
  }

  search(value: string) {
    console.log(value);
  }
}
