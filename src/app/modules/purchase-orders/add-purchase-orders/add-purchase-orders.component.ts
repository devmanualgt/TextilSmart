import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { Router } from '@angular/router';
import { FeedstockService } from '../../feedstocks/services/feedstock.service';
import { MaterialModule } from 'src/app/material.module';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



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
    TableComponent,
    MaterialModule,
    MatAutocompleteModule,
    AsyncPipe,
    
  ],
  templateUrl: './add-purchase-orders.component.html',
  styleUrl: './add-purchase-orders.component.scss',
})
export class AddPurchaseOrdersComponent implements OnInit {

  // proveedor = 'Ferreterias el Fierron';
  private _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    proveedorCtrl: ['', Validators.required] 
    
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  productos = this._formBuilder.array([this.createProduct()]);
  information: any;

  // variables para los proveedores
  MyProviders: any[] = []; 
  error: boolean = false; 

  constructor(private router: Router, private feedstockService: FeedstockService) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras.state) {
      const data = navigation.extras.state['data'];
      console.log(data);

      this.information = data;
    }
  }

  ngOnInit(): void {
    this.getProviders();

    
  }


  // Función para crear un producto con FormControls
  createProduct(): FormGroup {
    return this._formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      precio: [0, Validators.required],
      editable: [true],
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

  async getProviders() {
    const result = await this.feedstockService.getProviders();
    if (result.status) {
      this.MyProviders = result.data; // Almacenar datos
    } else {
      this.error = true; // Manejar error
    }
  }

  


}


