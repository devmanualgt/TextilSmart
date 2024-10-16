import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        data: {
          title: 'Dashborad',
        },
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Inicio',
        },
      },
    ],
  },
];
