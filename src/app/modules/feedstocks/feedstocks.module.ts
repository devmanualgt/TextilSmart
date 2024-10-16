import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FeedstockRoutes } from './feedstcoks.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(FeedstockRoutes)],
})
export class FeedstocksModule {}
