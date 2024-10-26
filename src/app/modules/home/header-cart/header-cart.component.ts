import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-cart',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterModule],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss'
})
export class HeaderCartComponent {
  
  viewCart: boolean = false;
  myCart$ = this.storeService.myCart$;




  constructor(private storeService: StoreService) { }

  onToggleCart() {
    this.viewCart = !this.viewCart

  };


}
