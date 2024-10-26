import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductCategoriesComponent } from './list-products/list-products-admin/product-categories/product-categories.component';
import { TblAdminComponent } from './list-products/list-products-admin/tbl-admin/tbl-admin.component';
import { ProductTypesComponent } from './list-products/list-products-admin/product-types/product-types.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

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
        children: [
          {
            path: 'admin',
            component: TblAdminComponent,
            data: {
              title: 'Categorias de Productos',
            },
          },
          {
            path: 'categories',
            component: ProductCategoriesComponent,
            data: {
              title: 'Categorias de Productos',
            },
          },

          {
            path: 'types',
            component: ProductTypesComponent,
            data: {
              title: 'Tipos de Productos',
            },
          },
        ],
      },
      {
        path: 'detail/:id',
        component: DetailProductComponent,
        data: {
          title: 'Productos',
        },
      },
    ],
  },
];
