import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  products: any[] = [];
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  };

  getProducts() {
    this.storeService.getAllProducts().subscribe((data: any) => {
      return this.products = data;

    })
  }
  addToCart(product: any) {

    this.storeService.addProduct(product)
  }

}
