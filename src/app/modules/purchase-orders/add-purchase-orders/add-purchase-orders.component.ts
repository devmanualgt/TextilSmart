import { PurchaseOrderService } from './../services/purchase-order.service';
import { AlertService } from './../../../services/alert.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { Router } from '@angular/router';
import { FeedstockService } from '../../feedstocks/services/feedstock.service';
import { MaterialModule } from 'src/app/material.module';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentsModule } from 'src/app/components/components.module';

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
    ComponentsModule,
    MaterialModule,
  ],
  templateUrl: './add-purchase-orders.component.html',
  styleUrl: './add-purchase-orders.component.scss',
})
export class AddPurchaseOrdersComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  listFeedstock = [];
  // proveedor = 'Ferreterias el Fierron';
  private _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
    proveedorCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  productos = this._formBuilder.array([this.createProduct()]);
  information: any;

  // variables para los proveedores
  MyProviders = [];
  error: boolean = false;

  constructor(
    private router: Router,
    private feedstockService: FeedstockService,
    private purchaseOrderService: PurchaseOrderService,
    private alertService: AlertService
  ) {
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
      materiaPrima: ['', Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
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

  async getDetailProvider() {
    console.log(this.firstFormGroup.value);
    if (this.firstFormGroup.value.proveedorCtrl) {
      const detail = await this.feedstockService.findByIdProdiver(
        this.firstFormGroup.value.proveedorCtrl
      );
      if (detail.status && detail.data.materiasPrimas.length <= 0) {
        this.alertService.alertSimple(
          'Notificacion',
          'El proveedor no tiene Materia Prima asociada',
          'info',
          'Acepatar',
          '',
          true
        );
      } else {
        this.myStepper.next();
        this.listFeedstock = detail.data.materiasPrimas;
      }
    }
  }

  async sendOrder() {
    console.log(this.productos.value);
    const data = {
      detalle: this.productos.value,
      proveedor: this.firstFormGroup.value.proveedorCtrl,
      descripcion: 'Prueba',
    };
    const send = await this.purchaseOrderService.createO(data);
    if (send.status) {
      this.alertService
        .alertSimple(
          'Notificacion',
          'Orden de compra generada',
          'success',
          'Acepatar',
          '',
          true
        )
        .then(async (es) => {
          this.router.navigate(['purchase/orders/list']);
        });
    }
  }
}
