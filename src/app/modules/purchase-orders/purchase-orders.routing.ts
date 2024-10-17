import { Routes } from '@angular/router';
import { ListPurchaseOrdersComponent } from './list-purchase-orders/list-purchase-orders.component';
import { AddPurchaseOrdersComponent } from './add-purchase-orders/add-purchase-orders.component';
import { DetailPurchaseOrdersComponent } from './detail-purchase-orders/detail-purchase-orders.component';
import { FinishPurchaseOrdersComponent } from './finish-purchase-orders/finish-purchase-orders.component';

export const PurchaseOrdersModuleRoutes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: 'list',
        component: ListPurchaseOrdersComponent,
        data: {
          title: 'Ordenes de Compra',
        },
      },

      {
        path: 'new',
        component: AddPurchaseOrdersComponent,
        data: {
          title: 'Nueva Orden de Compra',
          urls: [
            { title: 'Ordenes de Compra', url: '/purchase/orders/list' },
            { title: 'Nueva' },
          ],
        },
      },

      {
        path: 'detail/:id',
        component: DetailPurchaseOrdersComponent,
        data: {
          title: 'Detalle Orden de Compra',
          urls: [
            { title: 'Ordenes de Compra', url: '/purchase/orders/list' },
            { title: 'Detalle' },
          ],
        },
      },

      {
        path: 'finish/:id',
        component: FinishPurchaseOrdersComponent,
        data: {
          title: 'Finalizar Orden de Compra',
          urls: [
            { title: 'Ordenes de Compra', url: '/purchase/orders/list' },
            { title: 'Finalizar' },
          ],
        },
      },
    ],
  },
];
