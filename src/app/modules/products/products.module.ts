import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './products.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ProductRoutes)],
})
export class ProductsModule {}
