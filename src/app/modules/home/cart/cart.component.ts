import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  
  myCart$ = this.storeService.myCart$;

  viewCart: boolean = false;

  constructor(private storeService: StoreService, private router: Router) { }

  updateUnits(operation: string, id: string) {

    const product = this.storeService.findProductById(id)
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;

      }
      if (product.cantidad === 0) {
        this.deleteProduct(id)
      }
    }

  }
  totalProduct(price: number, units: number) {
    return price * units
  }
  deleteProduct(id: string) {
    this.storeService.deleteProduct(id);

  }
  totalCart() {
    const result = this.storeService.totalCart();
    return result;
  }


  // isCartOpen = false;

  // toggleCart() {
  //   this.isCartOpen = !this.isCartOpen;
  //   this.updateBodyScroll();
  // }

  // updateBodyScroll() {
  //   if (this.isCartOpen) {
  //     document.body.classList.add('no-scroll');
  //   } else {
  //     document.body.classList.remove('no-scroll');
  //   }
  // }

  
  pagar(){
    // this.router.navigate(['purchase/orders/new']);
    this.router.navigate(['sales/orders/detail/34']);
  }

}
