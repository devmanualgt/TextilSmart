import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { FnData, TblInformation } from 'src/app/models/tbl-information.model';
import { tbl_type_productos } from '../../../models/tbl-products';

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

  constructor(private productService: ProductService) {}

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

  actions(acction: FnData) {}
}
