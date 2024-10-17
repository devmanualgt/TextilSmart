import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesOrdersModuleRoutes } from './sales-orders.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(SalesOrdersModuleRoutes)],
})
export class SalesOrdersModule {}
