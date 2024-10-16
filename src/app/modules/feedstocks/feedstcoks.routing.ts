import { Routes } from '@angular/router';
import { ListFeedstockComponent } from './list-feedstock/list-feedstock.component';

export const FeedstockRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListFeedstockComponent,
        data: {
          title: 'Materia Prima',
        },
      },
    ],
  },
];
