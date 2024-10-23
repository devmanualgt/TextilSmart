import { Component } from '@angular/core';
import { CardsCustomerComponent } from './cards-customer/cards-customer.component';
import { TblAdminComponent } from './list-products-admin/tbl-admin/tbl-admin.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListProductsAdminComponent } from './list-products-admin/list-products-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CardsCustomerComponent,
    TblAdminComponent,
    ComponentsModule,
    ListProductsAdminComponent,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  user = { role: 'admin' };

  constructor(private router: Router) {
    console.log('hrers');
    if (this.user.role === 'admin')
      this.router.navigate([`/products/list/admin`]);
  }
}
