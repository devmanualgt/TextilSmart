import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService extends CrudService<any> {
  override API_URL = `${environment.API_URL}/v1/purchase/orders`;
  constructor(
    @Inject(HttpClient) http: HttpClient,
    public override alertService: AlertService
  ) {
    super(http, alertService);
  }

  async createO(form: any) {
    try {
      const formData = await this.toUrlEncodedArr(form);
      const response = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}`, formData, {
          observe: 'response',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      );

      if (response?.ok) {
        return {
          status: true,
          data: response.body['records'],
          message: response.body['message'],
        };
      } else {
        return { status: false };
      }
    } catch (error) {
      this.alertService.errorAlertNorm(error, error);
      return { status: false };
    }
  }
}
