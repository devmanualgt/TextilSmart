import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-table-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() productos!: any;
  @Input() listFeedstock = [];

  // Eliminar un producto
  deleteProduct(index: number) {
    this.productos.removeAt(index);
  }

  modifyProduct(index: number) {
    const product = this.productos.at(index);
    product.patchValue({ editable: !product.value.editable });
  }

  onProductSelected(index: number, row: number) {
    console.log(index);

    const productFormGroup = this.productos.at(row) as FormGroup;
    const selectedProduct = this.listFeedstock.find(
      (prod) => prod['id'] === index
    );

    // Si se encuentra el producto, actualiza el precio en el formulario
    if (selectedProduct) {
      productFormGroup
        .get('precio')
        ?.setValue(selectedProduct['precioUnitario']);
    }
  }
}
