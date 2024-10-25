import { ComponentsModule } from 'src/app/components/components.module';
import { PurchaseOrderService } from './../services/purchase-order.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { tbl_purchase_orders } from '../models/tbl-purchase-orders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-purchase-orders',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule],
  templateUrl: './list-purchase-orders.component.html',
  styleUrl: './list-purchase-orders.component.scss',
})
export class ListPurchaseOrdersComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData: any;
  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService
  ) {}

  async ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    this.tlbInfo = {
      tbl_name: 'Materia Prima',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_purchase_orders.headers,
      rows: tbl_purchase_orders.rows,
      btns: tbl_purchase_orders.btn,
    };
    const getList = await this.purchaseOrderService.find();
    if (getList.status) {
      this.tblData = getList.data;
    }
  }

  openModal(info?: FnData) {
    this.router.navigate([`purchase/orders/new`]);
  }

  search(value: string) {
    console.log(value);
  }

  actions(event: FnData) {
    if (event.type === CRUD.READ) {
      this.router.navigate([`purchase/orders/detail/${event.data.id}`]);
    }
  }
}
