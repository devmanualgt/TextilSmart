import { Component } from '@angular/core';
import { TblAdminSalesOrdersComponent } from './tbl-admin-sales-orders/tbl-admin-sales-orders.component';
import { CardsCustomerSalesOrdersComponent } from './cards-customer-sales-orders/cards-customer-sales-orders.component';

@Component({
  selector: 'app-list-sales-orders',
  standalone: true,
  imports: [TblAdminSalesOrdersComponent, CardsCustomerSalesOrdersComponent],
  templateUrl: './list-sales-orders.component.html',
  styleUrl: './list-sales-orders.component.scss',
})
export class ListSalesOrdersComponent {}
