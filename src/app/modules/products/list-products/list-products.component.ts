import { Component } from '@angular/core';
import { CardsCustomerComponent } from './cards-customer/cards-customer.component';
import { TblAdminComponent } from './tbl-admin/tbl-admin.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CardsCustomerComponent, TblAdminComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {}
