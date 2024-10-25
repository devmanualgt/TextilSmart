
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import { ComponentsModule } from 'src/app/components/components.module';
import {ProductService}from 'src/app/modules/products/services/product.service'
import { CrudService } from 'src/app/services/crud.service';
import {
  CRUD,
  FnData,
  TblInformation,
} from 'src/app/models/tbl-information.model';

import { AddProductComponent } from '../../../add-product/add-product.component';
import { NavigationExtras, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {tbl_type_productos} from 'src/app/modules/products/models/tbl-products';

@Component({
  selector: 'app-tbl-products-admin',
  templateUrl: 'tbl-admin.component.html',
  styleUrls: ['tbl-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ComponentsModule, MaterialModule],

})
export class TblAdminComponent {
  tblData: any;
  originalTblData: any;
  tlbInfo: TblInformation;
  
  @ViewChild('productModal', { static: false }) productModal!: ElementRef; // Modal de producto
  @ViewChild('newProductModal', { static: false }) newProductModal!: ElementRef; // Modal de nuevo producto

  selectedProduct = { id: '', name: '', price: 0, stock: 0 }; // Producto seleccionado para editar
  newProduct = { name: '', price: 0, stock: 0 }; // Inicialización del nuevo producto

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private crudService: CrudService<any>,
    private router: Router,
    private productService: ProductService
  ) {}

  // Abrir modal para agregar nuevo producto
  openProductModal(content: any) {
    this.newProduct = { name: '', price: 0, stock: 0 }; // Limpiar datos del nuevo producto
    this.modalService.open(content, { centered: true });
  }

  // Abrir modal para editar producto existente
  editProduct(
    product: { id: string; name: string; price: number; stock: number },
    content: any
  ) {
    this.selectedProduct = { ...product }; // Cargar datos del producto a editar
    this.modalService.open(content, { centered: true });
  }

  saveNewProduct() {
    alert('Nuevo producto agregado: ' + this.newProduct.name);
    this.modalService.dismissAll(); // Cierra el modal de nuevo producto
  }

  saveProduct() {
    alert('Cambios guardados para: ' + this.selectedProduct.name);
    this.modalService.dismissAll(); // Cierra el modal de edición de producto
  }

  deleteProduct(productId: string) {
    if (confirm(`¿Estás seguro de eliminar el producto ${productId}?`)) {
      alert(`Producto ${productId} eliminado.`);
    }
  }

  async deleteUser() {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Eliminación',
      '¿Está seguro de que desea eliminar este producto? Esta acción es irreversible y el producto no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (alertDeleted) {
      console.log('usar API para eliminar');
    }
  }


  ngOnInit(): void {
    this.getFeedStock();
  }

  async getFeedStock() {
    this.tlbInfo = {
      tbl_name: 'Productos Admin',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_type_productos.headers,
      rows:tbl_type_productos.rows,
      btns: tbl_type_productos.btn,
    };
    const getList = await this.productService.find();
    if (getList.status) {
      this.tblData = getList.data;
      this.originalTblData = [...this.tblData];
    }
  }

  actions(event: FnData) {
    if ([CRUD.DELETE].includes(event.type)) {
      this.deleteItem(event.data.id);
    } else if ([CRUD.CREATE, CRUD.UPDATE, CRUD.READ].includes(event.type)) {
      this.openModal(event);
    } else if ([CRUD.ACCTION].includes(event.type)) {
      const navigationExtras: NavigationExtras = {
        state: {
          data: event.data,
        },
      };
      console.log(navigationExtras);

      this.router.navigate([`purchase/orders/new`], navigationExtras);
    }
  }


  async deleteItem(id: string) {
    const alertDeleted = await this.alertService.alertSimple(
      'Confirmación de Eliminación',
      '¿Está seguro de que desea eliminar el dato? Esta acción es irreversible y el usuario no podrá ser recuperado.',
      'warning',
      'Sí, eliminar',
      'Cancelar',
      false
    );

    if (!alertDeleted) {
      return;
    }
    this.alertService.loader('Eliminando', '', 0);
    const deleted = await this.productService.delete(id);
    if (deleted.status) {
      this.alertService
        .alertSimple(
          'Notificación',
          deleted.message,
          'success',
          'Aceptar',
          '',
          true
        )
        .then(async (es) => {
          this.getFeedStock();
        });
    }
  }

  openModal(info?: FnData) {
    const modalRef = this.modalService.open(AddProductComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      keyboard: false,
    });
    modalRef.componentInstance.info = info;
    modalRef.result
      .then((result) => {
        if (result.refresh) {
          this.getFeedStock();
        }
      })
      .catch((reason) => {
        console.log('Modal cerrado con error:', reason);
      });
  }


  search(searchText: string): void {
    if (searchText === '') {
      // Si el texto de búsqueda está vacío, restaurar los datos originales
      this.tblData = [...this.originalTblData];
    } else {
      // Filtrar la tabla si hay texto en el campo de búsqueda
      this.tblData = this.crudService.filterDataTable(this.originalTblData, searchText);
    }
  }

  
}
