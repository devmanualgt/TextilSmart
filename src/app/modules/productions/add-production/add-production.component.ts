import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { AlertService } from 'src/app/services/alert.service';
import { FeedstockService } from '../../feedstocks/services/feedstock.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { ProductService } from '../../products/services/product.service';
import { ProductionService } from '../services/production.service';
import { UserService } from '../../users/services/user.service';
import { TblInformation } from 'src/app/models/tbl-information.model';
import { tbl_producction_feedstock } from '../models/tbl-productions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { AppDateAdapter } from 'src/app/shared/format-datepicker';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-add-production',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    //{ provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  standalone: true,
  imports: [
    CommonModule,
    NgSelectComponent,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    MatNativeDateModule,
  ],

  templateUrl: './add-production.component.html',
  styleUrl: './add-production.component.scss',
})
export class AddProductionComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  tlbInfo: TblInformation;
  tblData: any;
  selectedCar: number;
  providers = [];
  products = [];
  colors = [];
  sizes = [];
  users = [];
  productionForm: FormGroup;
  show_table: boolean;
  constructor(
    private fb: FormBuilder,
    private feedstockService: FeedstockService,
    private productService: ProductService,
    private productionService: ProductionService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generarFormularioProduccion();
    this.getData();

    this.tlbInfo = {
      tbl_name: 'Detalle Materia Prima Produccion',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_producction_feedstock.headers,
      rows: tbl_producction_feedstock.rows,
      btns: tbl_producction_feedstock.btn,
    };
  }

  async getData() {
    try {
      // Mostrar loader
      this.alertService.loader('Cargando...', 'Obteniendo datos...', 0);

      // Realizar todas las solicitudes en paralelo
      const [providersRes, productsRes, colorsRes, sizesRes, usersRes] =
        await Promise.all([
          this.feedstockService.getProviders(),
          this.productService.find(),
          this.productionService.getColors(),
          this.productionService.getSizes(),
          this.userService.find(),
        ]);

      // Validar que las respuestas sean exitosas
      const allSuccessful = [
        providersRes,
        productsRes,
        colorsRes,
        sizesRes,
        usersRes,
      ].every((res) => res.status);

      if (allSuccessful) {
        // Asignar los datos si todo fue exitoso
        this.providers = providersRes.data;
        this.products = productsRes.data;
        this.colors = colorsRes.data;
        this.sizes = sizesRes.data;
        this.users = usersRes.data;
        this.alertService.close();
        console.log(this.sizes);
      } else {
        // Si alguna respuesta no fue exitosa, lanzar un error
        throw new Error('Error al cargar algunos de los datos.');
      }
    } catch (error) {
      // Capturar cualquier error y mostrar una alerta
      this.alertService.errorAlertNorm(
        'Error',
        'No se pudieron cargar los datos.'
      );
      console.error('Error al cargar datos:', error);
    }
  }

  generarFormularioProduccion() {
    this.productionForm = this.fb.group({
      proveedor: [{ value: null, disabled: true }],
      producto: [null, Validators.required],
      color: [null, Validators.required],
      talla: [null, Validators.required],
      cantidad: [null, Validators.required],
      responsable: [null, Validators.required],
      fechaFinEstimada: [
        '',
        [Validators.required, this.fechaFinEstimadaValidator()],
      ],
      fechaInicio: [{ value: new Date(), disabled: true }, Validators.required],
    });

    this.productionForm.get('proveedor')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });

    this.productionForm.get('producto')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });

    this.productionForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });
  }

  async getValuesFeestock() {
    const producto = this.productionForm.get('producto')?.value;
    const cantidad = this.productionForm.get('cantidad')?.value;
    const proveedor = this.productionForm.get('proveedor')?.value;
    console.log(proveedor);

    if (producto && cantidad && !proveedor) {
      const body = { producto, cantidad };
      const detail = await this.productionService.getProductFeedstockDetails(
        body
      );
      console.log(detail.status);
      if (detail.status) {
        this.tblData = detail.data;

        this.show_table = true;
      }
    } else {
      this.show_table = false;
    }
  }

  async sendproduction() {
    console.log(this.productionForm.value);

    if (this.productionForm.invalid) {
      return;
    }

    /* const nombreProducto = this.buscarElemento(
      this.cars,
      this.productionForm.value.producto
    )['name'];
    const nombreEncargado = this.buscarElemento(
      this.cars2,
      this.productionForm.value.encargado
    )['name'];
    const nombreProveedor = this.buscarElemento(
      this.cars3,
      this.productionForm.value.proveedor
    )['name'];
    const colores = this.buscarElemento(
      this.cars4,
      this.productionForm.value.color
    )['name'];
    const tallas = this.buscarElemento(
      this.cars5,
      this.productionForm.value.talla
    )['name']; */
    const AlertService = await this.alertService.alertSimple(
      'Confirmación de Envío',
      '¿Está seguro de que desea enviar la solicitud con los datos actuales?',
      /* `<p> Proveedor: ${nombreProveedor} </p> <p> Producto: ${nombreProducto} </p> <p> Color: ${colores} </p>
      <p> Talla: ${tallas} </p> <p>Encargado: ${nombreEncargado}</p> <p> Cantidad a Fabricar: ${this.productionForm.value.cantidad} </p>
      <p> Fecha Inicio: ${this.productionForm.value.fechaInicio} </p> <p> Fecha Fin: ${this.productionForm.value.fechaFin} </p>`, */
      'warning',
      'Sí, enviar',
      'Cancelar',
      false
    );

    const dataFormSend = this.productionForm.value;
    dataFormSend['fechaFinEstimada'] = this.formatDate(
      dataFormSend.fechaFinEstimada
    );
    if (AlertService) {
      const production = await this.productionService.create(dataFormSend);
      if (production.status) {
        this.alertService
          .alertSimple(
            'Notificación',
            production.message,
            'success',
            'Aceptar',
            '',
            true
          )
          .then(async (es) => {
            this.router.navigate([`productions/list`]);
          });
      }
    }
  }

  buscarElemento(listado: any[], valor: string) {
    return listado.find((item) => (item['id'] = valor));
  }

  showProdiver(valor: any) {
    console.log(valor);
    const proveedorControl = this.productionForm.get('proveedor');

    if (valor) {
      proveedorControl?.enable(); // Habilita el control si valor es verdadero
      proveedorControl?.addValidators(Validators.required);
    } else {
      proveedorControl?.setValue(null);
      proveedorControl?.disable(); // Deshabilita el control si valor es falso
    }
  }

  fechaFinEstimadaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const minDate = new Date(currentDate.setDate(currentDate.getDate() + 5));

      const fechaFinEstimada = new Date(control.value);

      if (fechaFinEstimada < minDate) {
        return { fechaInvalida: true }; // Retorna un error si la fecha es menor que la fecha mínima
      }
      return null; // Retorna null si la fecha es válida
    };
  }

  formatDate(date: any): string {
    const fecha = new Date(date);
    const day = ('0' + fecha.getDate()).slice(-2); // Obtener el día con dos dígitos
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Obtener el mes con dos dígitos (sumar 1 porque los meses empiezan en 0)
    const year = fecha.getFullYear(); // Obtener el año

    return `${day}-${month}-${year}`; // Retornar en formato DD-MM-YYYY
  }
}
function provideMomentDateAdapter(): import('@angular/core').Provider {
  throw new Error('Function not implemented.');
}
