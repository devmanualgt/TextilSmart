import { Routes } from '@angular/router';
import { ListProductionsComponent } from './list-productions/list-productions.component';
import { AddProductionComponent } from './add-production/add-production.component';
import { DetailProductionComponent } from './detail-production/detail-production.component';
import { FinishProductionComponent } from './finish-production/finish-production.component';

export const ProductionsModuleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductionsComponent,
        data: {
          title: 'Producciones',
        },
      },

      {
        path: 'new',
        component: AddProductionComponent,
        data: {
          title: 'Nueva Produccion',
          urls: [
            { title: 'Producciones', url: '/productions/list' },
            { title: 'Nueva' },
          ],
        },
      },

      {
        path: 'detail/:id',
        component: DetailProductionComponent,
        data: {
          title: 'Detalle Produccion',
          urls: [
            { title: 'Producciones', url: '/productions/list' },
            { title: 'Detalle' },
          ],
        },
      },

      {
        path: 'finish/:id',
        component: FinishProductionComponent,
        data: {
          title: 'Finalizar Produccion',
          urls: [
            { title: 'Producciones', url: '/productions/list' },
            { title: 'Finalizar' },
          ],
        },
      },
    ],
  },
];
