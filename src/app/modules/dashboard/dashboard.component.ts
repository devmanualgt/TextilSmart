import { Component } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerComponent, AdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
