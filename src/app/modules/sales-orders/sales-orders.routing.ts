import { Routes } from '@angular/router';
import { ListSalesOrdersComponent } from './list-sales-orders/list-sales-orders.component';
import { AddSaleOrderComponent } from './add-sale-order/add-sale-order.component';
import { DetailSaleOrderComponent } from './detail-sale-order/detail-sale-order.component';
import { TrakingSaleOrderComponent } from './detail-sale-order/traking-sale-order/traking-sale-order.component';
import { NewSaleOrderCustomerComponent } from './add-sale-order/new-sale-order-customer/new-sale-order-customer.component';

export const SalesOrdersModuleRoutes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: 'list',
        component: ListSalesOrdersComponent,
        data: {
          title: 'Pedidos',
        },
      },

      {
        path: 'new',
        component: AddSaleOrderComponent,
        data: {
          title: 'Nuevo Pedido',
          urls: [
            { title: 'Pedidos', url: '/sales/orders/list' },
            { title: 'Nuevo' },
          ],
        },
        /* children: [
          {
            path: 'customer',
            component: NewSaleOrderCustomerComponent,
          },
        ], */
      },

      {
        path: 'detail/:id',
        component: DetailSaleOrderComponent,
        data: {
          title: 'Detalle del Pedido',
          urls: [
            { title: 'Pedidos', url: '/sales/orders/list' },
            { title: 'Detalle' },
          ],
        },
      },

      {
        path: 'tracking/:id',
        component: TrakingSaleOrderComponent,
        data: {
          title: 'Rastreo del Pedido',
          urls: [
            { title: 'Pedidos', url: '/sales/orders/list' },
            { title: 'Detalle' },
          ],
        },
      },

      {
        path: 'tracking',
        component: TrakingSaleOrderComponent,
        data: {
          title: 'Rastreo del Pedido',
          urls: [
            { title: 'Pedidos', url: '/sales/orders/list' },
            { title: 'Detalle' },
          ],
        },
      },
      // {
      //   //esta ruta la creo Denis, motivo: no la encontraba en otro ruting
      //   path: 'detail-sale-order',
      //   component: DetailSaleOrderComponent,
      //   data: {
      //     title: 'Detalle orden de compra',
      //     urls: [
      //       { title: 'Pedidos', url: '/sales/orders/list' },
      //       { title: 'Detalle' },
      //     ],
      //   },
      // },
    ],
  },
];
