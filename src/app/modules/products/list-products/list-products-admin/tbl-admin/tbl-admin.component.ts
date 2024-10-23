import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-tbl-products-admin',
  templateUrl: 'tbl-admin.component.html',
  styleUrls: ['tbl-admin.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ComponentsModule],
})
export class TblAdminComponent {
  @ViewChild('productModal', { static: false }) productModal!: ElementRef; // Modal de producto
  @ViewChild('newProductModal', { static: false }) newProductModal!: ElementRef; // Modal de nuevo producto

  selectedProduct = { id: '', name: '', price: 0, stock: 0 }; // Producto seleccionado para editar
  newProduct = { name: '', price: 0, stock: 0 }; // Inicialización del nuevo producto

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService
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
}
