import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product-detail.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: Product[] = [];

  private _products: BehaviorSubject<Product[]> ;

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
   }

  get products(){
    return this._products.asObservable();

  }

  addNewProduct(product: Product){
    this.cartProducts.push(product);
    this._products.next(this.cartProducts);
  }
}
