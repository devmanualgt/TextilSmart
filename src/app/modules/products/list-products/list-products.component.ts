import { Component, OnInit } from '@angular/core';
import { CardsCustomerComponent } from './cards-customer/cards-customer.component';
import { TblAdminComponent } from './list-products-admin/tbl-admin/tbl-admin.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListProductsAdminComponent } from './list-products-admin/list-products-admin.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CardsCustomerComponent,
    TblAdminComponent,
    ComponentsModule,
    ListProductsAdminComponent,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router, private authService: AuthService) {
    console.log('hrers');
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    if (this.currentUser.rol.rol === 'Administrador')
      this.router.navigate([`/products/list/admin`]);
    console.log(this.currentUser);
  }
}
