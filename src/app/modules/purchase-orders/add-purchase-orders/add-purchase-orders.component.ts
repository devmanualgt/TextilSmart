import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';


@Component({
  selector: 'app-add-purchase-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TableComponent
    
  ],
  templateUrl: './add-purchase-orders.component.html',
  styleUrl: './add-purchase-orders.component.scss'
})
export class AddPurchaseOrdersComponent {

  
  proveedor = "Ferreterias el Fierron"


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  productos = this._formBuilder.array([
    this.createProduct()
  ]);

  // Función para crear un producto con FormControls
  createProduct(): FormGroup {
    return this._formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      precio: [0, Validators.required],
      editable: [true]
    });
  }

    // Agregar un nuevo producto
  addProduct() {
    this.productos.push(this.createProduct());
  }

  // Eliminar un producto
  deleteProduct(index: number) {
    this.productos.removeAt(index);
  }
  modifyProduct(index: number) {
    const product = this.productos.at(index);
    product.patchValue({ editable: !product.value.editable });
  }

  

}
