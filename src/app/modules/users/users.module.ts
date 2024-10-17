import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersdRoutes } from './users.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(UsersdRoutes)],
})
export class UsersModule {}
