import {Component, Input} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CarouselComponent } from './carousel/carousel.component';
import { Product } from './interfaces/product-detail.interface';
import { CartService } from './services/cart.service';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from "../../layouts/full/vertical/header/header.component";
import { HeaderCartComponent } from './header-cart/header-cart.component';

// interface product {

//     id: number,
//     nombre: string,
//     precio: number
  
// }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    CarouselComponent,
    ProductComponent,
    HeaderCartComponent
    
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

    products: Product[]= [];

    // productos: Product[]  = [
    //     { id: 1, nombre: 'Producto1', precio: 100 , descripcion: "saf", img: "asdf"},
    //     { id: 2, nombre: 'Producto2', precio: 100 ,descripcion: "saf", img: "asdf"},
    //     { id: 3, nombre: 'Producto3', precio: 100 ,descripcion: "saf", img: "asdf"},
    //   ];

    constructor(private cartService: CartService){}
    
    async ngOnInit(){
      this.products = [
        { id: 1, nombre: 'Producto11', precio: 100 , descripcion: "saf", img: "asdf"},
        { id: 2, nombre: 'Producto2', precio: 100 ,descripcion: "saf", img: "asdf"},
        { id: 3, nombre: 'Producto3', precio: 100 ,descripcion: "saf", img: "asdf"},
      ];
    } 
    
   
}
