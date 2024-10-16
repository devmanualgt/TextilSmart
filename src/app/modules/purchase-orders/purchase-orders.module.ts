import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PurchaseOrdersModuleRoutes } from './purchase-orders.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(PurchaseOrdersModuleRoutes)],
})
export class PurchaseOrdersModule {}
