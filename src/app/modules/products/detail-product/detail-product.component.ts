import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  productId!: string;
  product: any; // Variable para almacenar los detalles del producto

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductId(); // Obtiene el ID del producto desde la URL
    this.getProductDetails(); // Carga los detalles del producto
  }

  // Obtener el ID del producto desde la URL
  getProductId() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
    });
  }

  // Llamar al servicio para obtener los detalles del producto
  async getProductDetails() {
    if (this.productId) {
      const productResponse = await this.productService.findById(this.productId);
      console.log(productResponse); // Verifica los datos de la API en la consola
      if (productResponse && productResponse.status) {
        this.product = productResponse.records;
  
        // Parsear los atributos_json si existen
        if (this.product.detelleAtributos) {
          this.product.detelleAtributos = this.product.detelleAtributos.map((attr: string) => JSON.parse(attr));
        }
      }
    }
  }
  
  
}
