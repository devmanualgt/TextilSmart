import { Component, inject, OnInit } from '@angular/core';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NavigationExtras, Router } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PurchaseOrderService } from '../services/purchase-order.service';
import { tbl_purchase_orders_detail } from '../models/tbl-purchase-orders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-purchase-orders',
  standalone: true,
  imports: [ComponentsModule, MaterialModule, TablerIconsModule, DatePipe],
  templateUrl: './detail-purchase-orders.component.html',
  styleUrl: './detail-purchase-orders.component.scss',
})
export class DetailPurchaseOrdersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  tlbInfo: TblInformation;
  tblData: any;
  originalTblData: any;
  orderId!: string;
  detalle: any;
  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getDetailId();
    this.getDetailOrder();
  }

  async getDetailOrder() {
    this.tlbInfo = {
      tbl_name: 'Lista de Ordenes',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_purchase_orders_detail.headers,
      rows: tbl_purchase_orders_detail.rows,
      btns: tbl_purchase_orders_detail.btn,
    };
    const detail = await this.purchaseOrderService.findById(this.orderId);
    if (detail.status) {
      this.detalle = detail.data;
      this.tblData = detail.data.detalleOrden;
      this.originalTblData = [...this.tblData];
    }
  }

  getDetailId() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id')!;
    });
  }
}
