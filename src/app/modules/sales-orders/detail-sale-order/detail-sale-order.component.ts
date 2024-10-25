import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { OrdersService } from '../services/orders.service';
import { DatePipe } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TblInformation } from 'src/app/models/tbl-information.model';
import { tbl_orders_detail } from '../models/tbl-orders';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-detail-sale-order',
  standalone: true,
  imports: [MaterialModule, DatePipe, TablerIconsModule, ComponentsModule],
  templateUrl: './detail-sale-order.component.html',
  styleUrl: './detail-sale-order.component.scss',
})
export class DetailSaleOrderComponent {
  tlbInfo: TblInformation;
  tblData: any;
  topcards: any[] = [
    {
      id: 1,
      color: 'primary',
      img: '/assets/images/svgs/icon-user-male.svg',
      icon: 'user',
      title: 'Cliente',
      subtitle: '3,685',
      name: 'cliente.nombre | cliente.apellido',
    },
    {
      id: 2,
      color: 'warning',
      img: '/assets/images/svgs/icon-briefcase.svg',
      icon: 'truck-delivery',
      title: 'Tipo Entrega',
      subtitle: '256',
      name: 'tipoEntrega',
    },
    {
      id: 3,
      color: 'accent',
      img: '/assets/images/svgs/icon-mailbox.svg',
      icon: 'flag',
      title: 'Estado',
      subtitle: '932',
      name: 'estado',
    },
    {
      id: 4,
      color: 'error',
      img: '/assets/images/svgs/icon-favorites.svg',
      icon: 'credit-card-pay',
      title: 'Tipo Pago',
      subtitle: '$348K',
      name: 'tipoPago',
    },
    {
      id: 5,
      color: 'success',
      img: '/assets/images/svgs/icon-speech-bubble.svg',
      icon: 'calendar-plus',
      title: 'Fecha Creacion',
      subtitle: '96',
      name: 'createdAt',
      pipe: 'date',
    },
    {
      id: 6,
      color: 'accent',
      img: '/assets/images/svgs/icon-connect.svg',
      icon: 'coin',
      title: 'Total',
      subtitle: '48',
      name: 'total',
    },
  ];
  detalle: any;
  data: any;
  private route = inject(ActivatedRoute);
  orderId!: string;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getDetailId();
    this.getDetailOrder();
  }

  async getDetailOrder() {
    this.tlbInfo = {
      tbl_name: 'Materia Prima',
      export_xls: false,
      scroll_tbl: false,
      headers: tbl_orders_detail.headers,
      rows: tbl_orders_detail.rows,
      btns: tbl_orders_detail.btn,
    };
    const detail = await this.ordersService.findById(this.orderId);
    if (detail.status) {
      this.detalle = detail.data;
      this.tblData = this.detalle.detallePedido;
      this.machValues();
    }
  }

  async machValues() {
    const updatedArray = this.topcards
      .map((item) => {
        // Divide las partes que deben concatenarse, en caso de tener el carácter "|"
        const concatenatedFields = item['name']
          .split('|')
          .map((field: string) => field.trim());

        // Construye el valor concatenado
        const concatenatedValue = concatenatedFields
          .map((field: string) => {
            // Divide las propiedades anidadas en caso de que haya un "."
            const propertyPath = field.split('.');

            // Recorre el objeto `da` siguiendo el path de propiedades
            let value = this.detalle;
            for (const key of propertyPath) {
              value = value ? value[key] : undefined;
            }
            return value !== undefined ? value : ''; // Asegura que devuelva una cadena vacía si la propiedad no existe
          })
          .join(' '); // Concatena los valores obtenidos con un espacio

        // Crea el objeto actualizado solo si hay algún valor concatenado
        if (concatenatedValue.trim()) {
          return {
            ...item,
            value: concatenatedValue,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    this.data = updatedArray;
    this.data[5].value = this.detalle.paymentDetails[0].total;
  }

  getDetailId() {
    this.route.paramMap.subscribe((params) => {
      this.orderId = params.get('id')!;
    });
  }
}
