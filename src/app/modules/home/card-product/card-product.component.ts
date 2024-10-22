import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../interfaces/product-detail.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

  products: Product[]=[];
  constructor( private cartService: CartService) {}

  ngOnInit(){
    this.cartService.products.subscribe(products => {
      // console.log('hola')
      // console.log(products);
      this.products = products; 
    });
  }

  // @Input() productos?: Product[];

  // onClick(product: Product){
  //   this.cartService.addNewProduct(product);

  // }

}
