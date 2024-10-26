import { Component, OnInit } from '@angular/core';
import { TblAdminSalesOrdersComponent } from './tbl-admin-sales-orders/tbl-admin-sales-orders.component';
import { CardsCustomerSalesOrdersComponent } from './cards-customer-sales-orders/cards-customer-sales-orders.component';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-list-sales-orders',
  standalone: true,
  imports: [TblAdminSalesOrdersComponent, CardsCustomerSalesOrdersComponent],
  templateUrl: './list-sales-orders.component.html',
  styleUrl: './list-sales-orders.component.scss',
})
export class ListSalesOrdersComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    console.log(this.currentUser);
  }
}
