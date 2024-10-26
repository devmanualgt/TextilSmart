import { UserService } from './../../../users/services/user.service';
import { CustomerService } from './../../../users/services/customers.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { InvoiceList, order } from 'src/app/pages/apps/invoice/invoice';
import { ServiceinvoiceService } from 'src/app/pages/apps/invoice/serviceinvoice.service';
import { AlertService } from 'src/app/services/alert.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-new-sale-order-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    TablerIconsModule,
    ComponentsModule,
  ],
  templateUrl: './new-sale-order-admin.component.html',
  styleUrl: './new-sale-order-admin.component.scss',
})
export class NewSaleOrderAdminComponent implements OnInit {
  addForm: UntypedFormGroup | any;
  rows: UntypedFormArray;
  invoice: InvoiceList = new InvoiceList();

  subTotal = 0;
  vat = 0;
  grandTotal = 0;
  saleForm: FormGroup;

  customers: any = [];
  products: any = [];
  roles: any = [];
  deliveries: any = [];
  constructor(
    private fb: UntypedFormBuilder,
    private invoiceService: ServiceinvoiceService,
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private productService: ProductService,
    private alertService: AlertService,
    private userService: UserService,
    private ordersService: OrdersService
  ) {
    // tslint:disable-next-line - Disables all
    this.invoice.id =
      Math.max.apply(
        Math,
        this.invoiceService.getInvoiceList().map(function (o: any) {
          return o.id;
        })
      ) + 1;
    this.invoice.status = 'Pending';

    ///////////////////////////////////////////////////////////

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }

  ngOnInit(): void {
    this.getData();
    this.generarFormularioVenta();
  }

  async getData() {
    try {
      // Mostrar loader
      this.alertService.loader('Cargando...', 'Obteniendo datos...', 0);

      // Realizar todas las solicitudes en paralelo
      const [customers, productsRes, roles, deliveries] = await Promise.all([
        this.customerService.find(),
        this.productService.find(),
        this.userService.getRoles(),
        this.ordersService.getDeliveries(),
      ]);

      // Validar que las respuestas sean exitosas
      const allSuccessful = [customers, productsRes, roles, deliveries].every(
        (res) => res.status
      );

      if (allSuccessful) {
        // Asignar los datos si todo fue exitoso
        this.products = productsRes.data;
        this.customers = customers.data;
        this.roles = roles.data;
        this.deliveries = deliveries.data;
        this.alertService.close();
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

  generarFormularioVenta() {
    const gues = this.roles.find((r: any) => r.nombre);
    this.saleForm = this.fb.group({
      // id si es cliente
      cliente: [null],
      // Datos para nuevo usuario
      nombre: [null],
      apellido: [null],
      telefono: [null],
      rol: [gues.id],
      // Entrega
      direccion: [null],
      departamento: [null],
      municipio: [null],
      // facturacion
      nit: [null],
      razonSocial: [null],
      direccionFacturacion: [null],

      // Datos peido
      tipoEntrega: [],
      tipoPago: [],
      entregaInmediata: [],
    });

    this.saleForm.get('proveedor')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });

    this.saleForm.get('producto')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });

    this.saleForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.getValuesFeestock();
    });
  }

  getValuesFeestock() {}

  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number): void {
    const totalCostOfItem =
      this.addForm.get('rows')?.value[rowIndex].unitPrice *
      this.addForm.get('rows')?.value[rowIndex].units;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      units: ['', Validators.required],
      unitPrice: ['', Validators.required],
      itemTotal: ['0'],
    });
  }

  itemsChanged(): void {
    let total: number = 0;
    // tslint:disable-next-line - Disables all
    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('rows')).length;
      t++
    ) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice !== '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice *
            this.addForm.get('rows')?.value[t].units +
          total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
  }
  ////////////////////////////////////////////////////////////////////

  saveDetail(): void {
    this.invoice.grandTotal = this.grandTotal;
    this.invoice.totalCost = this.subTotal;
    this.invoice.vat = this.vat;
    // tslint:disable-next-line - Disables all
    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('rows')).length;
      t++
    ) {
      const o: order = new order();
      o.itemName = this.addForm.get('rows')?.value[t].itemName;
      o.unitPrice = this.addForm.get('rows')?.value[t].unitPrice;
      o.units = this.addForm.get('rows')?.value[t].units;
      o.unitTotalPrice = o.units * o.unitPrice;
      this.invoice.orders.push(o);
    }
    /* this.dialog.open(AddedDialogComponent);
    this.invoiceService.addInvoice(this.invoice);
    this.router.navigate(['/apps/invoice']); */
  }
}
