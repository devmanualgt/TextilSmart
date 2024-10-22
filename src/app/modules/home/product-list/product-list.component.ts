import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../interfaces/product-detail.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productos: Product[]= [];

  constructor(private cartService: CartService){}

  async ngOnInit(){
    this.productos = [
      { id: 1, nombre: 'Producto1', precio: 100 , descripcion: "saf", img: "asdf"},
      { id: 2, nombre: 'Producto2', precio: 100 ,descripcion: "saf", img: "asdf"},
      { id: 3, nombre: 'Producto3', precio: 100 ,descripcion: "saf", img: "asdf"},
    ];
  } 
  
  onClick(product: Product){
    this.cartService.addNewProduct(product);

  }


}
