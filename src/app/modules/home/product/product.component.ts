import { Component, Input } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../products/services/product.service';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SearchBarComponent } from '../search-bar/search-bar.component';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    TablerIconsModule,
    SearchBarComponent

  ],
  
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  // @Input() text: string = '';


  data: any[] = [];

  filteredData: any[] = [];
  searchTerm: string = '';


  constructor(private storeService: StoreService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getData();
    
  };

  // ngOnChanges() {
  //   this.filterProducts(); 
  // }

  addToCart(product: any) {
   

    this.storeService.addProduct(product)
  }

  async getData() {
    const result = await this.productService.find();
    if (result.status) {
      this.data = result.data; 
      this.filteredData = this.data; 
      console.log(this.data)
      
    } else {
      console.error('Error al obtener datos');
    }
  }


    filterProducts(text: string) {
      if (!text) {
        this.filteredData = this.data; // Muestra todos los productos si no hay búsqueda
      } else {
        this.filteredData = this.data.filter(product =>
          product.nombre.toLowerCase().includes(text.toLowerCase())
        );
      }
    }

   

    toNumber(number:string){
      return parseInt(number);
    }

}



  // Método para filtrar productos
  // filterProducts() {
  //   this.filteredProducts = this.data.filter(product =>
  //     product.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }


  // filterProducts() {
  //   if (!this.searchTerm) {
  //     this.filteredProducts = this.data; // Muestra todos los productos si no hay búsqueda
  //   } else {
  //     this.filteredProducts = this.data.filter(product =>
  //       product.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }