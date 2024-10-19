import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductRoutes } from './products.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule,FormsModule, RouterModule.forChild(ProductRoutes)],
})
export class ProductsModule {}
