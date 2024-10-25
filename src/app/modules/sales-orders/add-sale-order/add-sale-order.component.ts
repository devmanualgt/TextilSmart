import { Component } from '@angular/core';
import { NewSaleOrderCustomerComponent } from './new-sale-order-customer/new-sale-order-customer.component';

@Component({
  selector: 'app-add-sale-order',
  standalone: true,
  imports: [NewSaleOrderCustomerComponent],
  templateUrl: './add-sale-order.component.html',
  styleUrl: './add-sale-order.component.scss',
})
export class AddSaleOrderComponent {}
