import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { TblAdminComponent } from './tbl-admin/tbl-admin.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products-admin',
  standalone: true,
  imports: [
    MaterialModule,
    TblAdminComponent,
    ProductCategoriesComponent,
    ProductTypesComponent,
    RouterModule,
  ],
  templateUrl: './list-products-admin.component.html',
  styleUrl: './list-products-admin.component.scss',
})
export class ListProductsAdminComponent {
  tabs = [
    {
      label: 'Productos',
      path: '/products/list/admin',
    },
    /*  {
      label: 'Categorias',
      path: '/products/list/categories',
    }, */
    {
      label: 'Tipos',
      path: '/products/list/types',
    },
  ];
}
