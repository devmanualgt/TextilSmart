import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductsComponent,
        data: {
          title: 'Productos',
        },
      },
    ],
  },
];
