import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./pages/forms/forms.module').then((m) => m.FormModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then((m) => m.ChartsModule),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'datatable',
        loadChildren: () =>
          import('./pages/datatable/datatable.module').then(
            (m) => m.DatatableModule
          ),
      },
      {
        path: 'theme-pages',
        loadChildren: () =>
          import('./pages/theme-pages/theme-pages.module').then(
            (m) => m.ThemePagesModule
          ),
      },

      // NUEVAS RUTAS
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },

      {
        path: 'feedstocks',
        loadChildren: () =>
          import('./modules/feedstocks/feedstocks.module').then(
            (m) => m.FeedstocksModule
          ),
      },
      {
        path: 'purchase',
        loadChildren: () =>
          import('./modules/purchase-orders/purchase-orders.module').then(
            (m) => m.PurchaseOrdersModule
          ),
      },
      {
        path: 'productions',
        loadChildren: () =>
          import('./modules/productions/productions.module').then(
            (m) => m.ProductionsModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./modules/sales-orders/sales-orders.module').then(
            (m) => m.SalesOrdersModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'products/out',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      //Esta ruta la agrego Denis
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import ('./modules/home/home.component'),
      },
      
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
