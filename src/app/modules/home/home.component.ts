import {Component, Input, ViewChild} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CarouselComponent } from './carousel/carousel.component';
import { Product } from './interfaces/product-detail.interface';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from "../../layouts/full/vertical/header/header.component";
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { ProductService } from '../products/services/product.service';
import { SearchComponent } from 'src/app/components/table/search/search.component';
import { CommonModule } from '@angular/common';
import { StoreService } from './services/store.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    CarouselComponent,
    ProductComponent,
    HeaderCartComponent,
    // BrowserModule, 
    FormsModule
    
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

    products: Product[]= [];
    busqueda: string = '';

    constructor(private productService: ProductService, private storeService: StoreService){}


    
    async ngOnInit(){

      // const a = await this.productService.find();
      // console.log(a);
      
    } 

    filterResults(text : string){

      this.storeService.filterProducts(text);
      console.log('hola')

    }

   
}