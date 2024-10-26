import { Component } from '@angular/core';
import { NewSaleOrderCustomerComponent } from './new-sale-order-customer/new-sale-order-customer.component';
import { NewSaleOrderAdminComponent } from './new-sale-order-admin/new-sale-order-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sale-order',
  standalone: true,
  imports: [NewSaleOrderCustomerComponent, NewSaleOrderAdminComponent],
  templateUrl: './add-sale-order.component.html',
  styleUrl: './add-sale-order.component.scss',
})
export class AddSaleOrderComponent {
  user = { role: 'admin' };

  constructor(private router: Router) {
    console.log('hrers');
    if (this.user.role === 'admin') {
    }
    //this.router.navigate([`/products/list/admin`]);
  }
}
