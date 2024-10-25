import { DetailProductTypeComponent } from './detail-product-type/detail-product-type.component';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';
import { tbl_type_productos } from '../../../models/tbl-products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-types',
  standalone: true,
  imports: [MaterialModule, ComponentsModule],
  templateUrl: './product-types.component.html',
  styleUrl: './product-types.component.scss',
})
export class ProductTypesComponent implements OnInit {
  tlbInfo: TblInformation;
  tblData = [];

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  async getTypes() {
    this.tlbInfo = {
      tbl_name: 'Tipo Productos',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_type_productos.headers,
      rows: tbl_type_productos.rows,
      btns: tbl_type_productos.btn,
    };
    const getListType = await this.productService.getTypes();
    if (getListType.status) {
      this.tblData = getListType.data;
    }
  }

  actions(acction: FnData) {
    if (acction.type === CRUD.READ) {
      this.openModal(acction);
    }
  }

  openModal(info?: FnData) {
    const modalRef = this.modalService.open(DetailProductTypeComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      keyboard: false,
    });
    modalRef.componentInstance.info = info;
    modalRef.result
      .then((result) => {
        if (result.refresh) {
          this.getTypes();
        }
      })
      .catch((reason) => {
        console.log('Modal cerrado con error:', reason);
      });
  }
}
