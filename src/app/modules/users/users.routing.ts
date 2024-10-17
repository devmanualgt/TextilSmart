import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';

export const UsersdRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUsersComponent,
        data: {
          title: 'Usuarios',
        },
      },
    ],
  },
];
