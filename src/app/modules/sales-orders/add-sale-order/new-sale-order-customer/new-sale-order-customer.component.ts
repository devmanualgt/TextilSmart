import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { StoreService } from 'src/app/modules/home/services/store.service';
import { AdressService } from './adress.service';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'app-new-sale-order-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    MaterialModule,
    MatCardModule,
    MatCheckboxModule,
    MaterialModule
  ],
  templateUrl: './new-sale-order-customer.component.html',
  styleUrl: './new-sale-order-customer.component.scss',

  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    provideNativeDateAdapter(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewSaleOrderCustomerComponent {
  
  // Variable para el estado del registro
  isRegistering: boolean = false;
  typeClinet: boolean = false;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private addressService: AdressService,
    private storeService: StoreService,
    private router: Router,
    private orderService: OrdersService,
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: [{ value: '', disabled: true }, Validators.required],
      clave: ['']
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  // Método para manejar el cambio del radio button
  // '1' significa "Registrar una cuenta"
  onRegistrationChange(value: string) {
    this.isRegistering = value === '1'; 
  }
  clientOrCompany(value: string) {
    this.typeClinet = value === '2';
  }


  dataSource: any[] = [];

  ngOnInit() {
    this.storeService.myCart$.subscribe((cartItems) => {
      this.dataSource = cartItems;

      this.getAdress();
      this.getDeliveries()
      this.getPayments()
    });


  }

  totalCart() {
    const result = this.storeService.totalCart();
    return result;
  }

  updateUnits(operation: string, id: string) {
    const product = this.storeService.findProductById(id);
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;
      }
      if (product.cantidad === 0) {
        this.deleteProduct(id);
      }
    }
  }
  deleteProduct(id: string) {
    this.storeService.deleteProduct(id);
  }
  comprar() {
    this.router.navigate(['home']);
  }


  addresses: any[] = [];
  municipios: any[] = [];
  selectedDep: string
  selectedMun: string | null

  regresar(){
    this.router.navigate(['home']);

  }

  getAdress(){
    this.addressService.getAddress().subscribe(response => {
      if (response?.ok) {
        this.addresses = response.body['records'];
        console.log(this.addresses)
      } else {
        // Maneja el caso en que no se obtienen datos
        console.error('No se pudieron obtener las direcciones');
        this.addressService.alertService.errorAlertNorm("Error","No se pueden obtener datos")
      }
    });
  }


  getMunicipios(event: any) {
    const selectedDepId = event.value;
    const selectedDep = this.addresses.find((a: any) => a.id === selectedDepId);
    this.municipios = selectedDep ? selectedDep.municipios : [];
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }

  deliveries: any[] = [];

  async getDeliveries() {
    try {
      const getDelivery = await this.orderService.getDeliveries();
      this.deliveries = getDelivery.data;
    } catch (error) {
      console.error("Error al obtener las entregas:", error);
    }
  }

  payments: any[] = [];
  async getPayments() {
    try {
      const getPayment = await this.orderService.getPayments();
      this.payments = getPayment.data;
    } catch (error) {
      console.error("Error al obtener las entregas:", error);
    }
  }
}
