import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl: string = 'https://api.escuelajs.co/api/v1/';

  //lista carrito
  private myList: any[] = [];

  //carrito observable
  private myCart = new BehaviorSubject<any[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    const response = this.httpClient.get<any[]>(`${this.baseUrl}products`);
    // console.log(response);
    return response
  }


  //añado producto al carrito
  // addProduct(product: any) {

  //   // debugger;
  //   if (this.myList.length === 0) {
  //     product.cantidad = 1;
  //     this.myList.push(product);
  //     //emito la lista para los que estén escuchando
  //     this.myCart.next(this.myList);

  //   } else {
  //     const productMod = this.myList.find((element) => {
  //       return element.id === product.id
  //     })
  //     if (productMod) {
  //       productMod.cantidad = productMod.cantidad + 1;
  //       this.myCart.next(this.myList);
  //     } else {
  //       product.cantidad = 1;
  //       this.myList.push(product);
  //       //ojo hay que emitir la lista!!
  //       this.myCart.next(this.myList);
  //     }

  //   }
  // }

  addProduct(product: any) {

    // debugger;
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);

    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        //ojo hay que emitir la lista!!
        this.myCart.next(this.myList);
      }

    }
  }

  findProductById(id: string) {
    return this.myList.find((element) => {
      return element.id === id
    })

  }

  deleteProduct(id: string) {

    this.myList = this.myList.filter((product) => {
      return product.id != id
    })
    this.myCart.next(this.myList);


  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.precio); }, 0)
    return total
  }


  // Nuevo método para filtrar productos
  filterProducts(searchTerm: string): any[] {
    if (!searchTerm) {
      return this.myList; // Devuelve todos los productos si no hay término de búsqueda
    }
    return this.myList.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  

  
}
