import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../../home/services/store.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-detail-sale-order',
  standalone: true,
  imports: [
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
    MatCardModule , 
  MatCheckboxModule,
  ],
  templateUrl: './detail-sale-order.component.html',
  styleUrl: './detail-sale-order.component.scss',

  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailSaleOrderComponent {
  // Variable para el estado del registro
  isRegistering: boolean = false;
  typeClinet: boolean = false;

  // Método para manejar el cambio del radio button
  onRegistrationChange(value: string) {
    this.isRegistering = value === '1'; // '1' significa "Registrar una cuenta"
  }
  clientOrCompany(value: string) {
    this.typeClinet = value === '2'; // '1' significa "Registrar una cuenta"
  }
  
  constructor(private storeService: StoreService, private router: Router){}

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    direccion: ['', Validators.required],
    municipio: ['', Validators.required],
    departamento: ['', Validators.required],
    clave: ['', Validators.required],
  });
  
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  dataSource: any[] = [];

  ngOnInit() {
    this.storeService.myCart$.subscribe(cartItems => {
      this.dataSource = cartItems; 
      

    });
  }

  totalCart() {
    const result = this.storeService.totalCart();
    return result;
  }

  updateUnits(operation: string, id: string) {

    const product = this.storeService.findProductById(id)
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;

      }
      if (product.cantidad === 0) {
        this.deleteProduct(id)
      }
    }

  }
  deleteProduct(id: string) {
    this.storeService.deleteProduct(id);

  }
  comprar(){
    this.router.navigate(['home'])

  }


}
