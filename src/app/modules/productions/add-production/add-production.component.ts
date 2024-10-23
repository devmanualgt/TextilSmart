import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
import Swal from 'sweetalert2';
import { FeedstockService } from '../../feedstocks/services/feedstock.service';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../../products/services/product.service';
import { ProductionService } from '../services/production.service';
import { UserService } from '../../users/services/user.service';
import { TblInformation } from 'src/app/models/tbl-information.model';
import { tbl_producction_feedstock } from '../models/tbl-productions';

@Component({
  selector: 'app-add-production',
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
    private alertService: AlertService
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
      this.alertService.loader('Cargando...', 'Obteniendo datos...', 1000);

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
      proveedor: [null, Validators.required],
      producto: [null, Validators.required],
      color: [null, Validators.required],
      talla: [null, Validators.required],
      cantidad: [null, Validators.required],
      responsable: [null, Validators.required],
      fechaFinEstimada: ['', Validators.required],
      fechaInicio: ['', Validators.required],
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

    if (AlertService) {
      console.log('usar API para enviar');
    }
  }

  buscarElemento(listado: any[], valor: string) {
    return listado.find((item) => (item['id'] = valor));
  }
}
