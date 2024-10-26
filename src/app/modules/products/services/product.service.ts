import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CrudService<any> {
  override API_URL = `${environment.API_URL}/v1/products`;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    public override alertService: AlertService
  ) {
    super(http, alertService);
  }

  // Método para obtener detalles de un producto por su ID
  override async findById(id: string) {  // Añade el modificador override aquí
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/${id}`, { observe: 'response' })
      );

      if (response?.ok) {
        return response.body; // Retorna el cuerpo de la respuesta con los detalles del producto
      } else {
        this.alertService.errorAlertNorm('Error al obtener el producto', 'Error');
        return null;
      }
    } catch (error) {
      this.alertService.errorAlertNorm(error, error);
      return null;
    }
  }

  async getTypes() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/types`, { observe: 'response' })
      );

      if (response?.ok) {
        return { status: true, data: response.body['records'] };
      } else {
        return { status: false };
      }
    } catch (error) {
      this.alertService.errorAlertNorm(error, error);
      return { status: false };
    }
  }

  // Nuevo método para obtener categorías
  async getCategories() {
    // Implementación futura
  }
}
