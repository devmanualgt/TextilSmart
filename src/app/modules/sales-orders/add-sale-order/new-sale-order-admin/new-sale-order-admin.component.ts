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
import { ThisReceiver } from '@angular/compiler';
import { add } from 'date-fns';

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
  payments: any = [];
  departamentos: any = [];
  municipios: any = [];
  detalle: any;
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
      const [
        customers,
        productsRes,
        roles,
        deliveries,
        departamentos,
        payments,
      ] = await Promise.all([
        this.customerService.find(),
        this.productService.find(),
        this.userService.getRoles(),
        this.ordersService.getDeliveries(),
        this.ordersService.getDepartamentos(),
        this.ordersService.getPayments(),
      ]);

      // Validar que las respuestas sean exitosas
      const allSuccessful = [
        customers,
        productsRes,
        roles,
        deliveries,
        departamentos,
        payments,
      ].every((res) => res.status);

      if (allSuccessful) {
        // Asignar los datos si todo fue exitoso
        this.products = productsRes.data;
        this.customers = customers.data;
        this.roles = roles.data;
        this.deliveries = deliveries.data;
        this.payments = payments.data;
        this.departamentos = departamentos.data;
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
    //const gues = this.roles.find((r: any) => r.nombre);
    this.saleForm = this.fb.group({
      // id si es cliente
      cliente: [null],
      // Datos para nuevo usuario
      nombre: [null],
      apellido: [null],
      telefono: [null],
      rol: [null],
      correoElectronico: [null],
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

      //productos
      detallePedido: this.rows,
    });

    this.saleForm.get('departamento')?.valueChanges.subscribe(() => {
      this.valuesMunicipios();
    });

    // obv para el detalle
    this.saleForm.get('tipoEntrega')?.valueChanges.subscribe(() => {
      this.getDetallePago();
    });
    this.saleForm.get('tipoPago')?.valueChanges.subscribe(() => {
      this.getDetallePago();
    });
    this.saleForm.get('entregaInmediata')?.valueChanges.subscribe(() => {
      this.getDetallePago();
    });
    this.saleForm.get('detallePedido')?.valueChanges.subscribe(() => {
      this.getDetallePago();
    });
  }

  valuesMunicipios() {
    const idDep = this.saleForm.get('departamento')?.value;
    const curentDep = this.departamentos.find((d: any) => d.id === idDep);
    this.municipios = curentDep.municipios;
  }

  async getDetallePago() {
    const tipoEntrega = this.saleForm.get('tipoEntrega')?.value;
    const tipoPago = this.saleForm.get('tipoPago')?.value;
    const entregaInmediata = this.saleForm.get('entregaInmediata')?.value;
    const detallePedido = this.saleForm.get('detallePedido')?.value;

    console.log(tipoEntrega);
    console.log(tipoPago);
    console.log(entregaInmediata);
    console.log(detallePedido);
    if (
      tipoEntrega &&
      tipoPago &&
      detallePedido[0].producto !== '' &&
      detallePedido[0].cantidad !== ''
    ) {
      console.log('sedn');
      const fornDetail = {
        tipoEntrega,
        tipoPago,
        entregaInmediata,
        detallePedido,
      };
      const detail = await this.ordersService.postDetal(fornDetail);
      console.log(detail);
      this.detalle = detail.data;
    }
    /* if (tipoEntrega && tipoPago && detallePedido.length > 0) {

    } */
  }

  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number): void {
    const totalCostOfItem =
      this.addForm.get('rows')?.value[rowIndex].unitPrice *
      this.addForm.get('rows')?.value[rowIndex].cantidad;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
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
        this.addForm.get('rows')?.value[t].cantidad
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice *
            this.addForm.get('rows')?.value[t].cantidad +
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
      const o: any = new order();
      o.producto = this.addForm.get('rows')?.value[t].producto;
      o.unitPrice = this.addForm.get('rows')?.value[t].unitPrice;
      o.cantidad = this.addForm.get('rows')?.value[t].cantidad;
      o.unitTotalPrice = o.cantidad * o.unitPrice;
      this.invoice.orders.push(o);
    }
    /* this.dialog.open(AddedDialogComponent);
    this.invoiceService.addInvoice(this.invoice);
    this.router.navigate(['/apps/invoice']); */
  }

  async sendSale() {
    console.log(this.saleForm.value);

    const userData = {
      nombre: this.saleForm.get('nombre')?.value,
      apellido: this.saleForm.get('apellido')?.value,
      telefono: this.saleForm.get('telefono')?.value,
      rol: this.saleForm.get('rol')?.value,
      correoElectronico: this.saleForm.get('correoElectronico')?.value,
      nit: this.saleForm.get('nit')?.value,
      razonSocial: this.saleForm.get('nombre')?.value,
      direccionFacturacion: this.saleForm.get('direccionFacturacion')?.value,
    };

    const address = {
      direccion: this.saleForm.get('direccion')?.value,
      departamento: this.saleForm.get('departamento')?.value,
      municipio: this.saleForm.get('municipio')?.value,
    };

    const newAccount = { userData };

    const dataForm = {
      ...this.saleForm.value,
      newAccount,
      address,
    };

    console.log(dataForm);

    this.alertService.loader('Guardando', 'Generando pedido...', 0);
    const newOder = await this.ordersService.create(dataForm);
    if (newOder.status) {
      this.alertService
        .alertSimple(
          'Notificación',
          newOder.message,
          'success',
          'Aceptar',
          '',
          true
        )
        .then(async (es) => {
          this.router.navigate(['sales/orders/list']);
        });
    }
    console.log(newOder);
  }

  onProductSelected(index: number, row: number) {
    console.log(index);

    const productFormGroup = this.rows.at(row) as FormGroup;
    const selectedProduct = this.products.find(
      (prod: any) => prod['id'] === index
    );

    // Si se encuentra el producto, actualiza el precio en el formulario
    if (selectedProduct) {
      productFormGroup.get('unitPrice')?.setValue(selectedProduct['precio']);
    }
  }
}
