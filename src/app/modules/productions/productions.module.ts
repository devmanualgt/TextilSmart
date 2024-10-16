import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductionsModuleRoutes } from './productions.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ProductionsModuleRoutes)],
})
export class ProductionsModule {}
