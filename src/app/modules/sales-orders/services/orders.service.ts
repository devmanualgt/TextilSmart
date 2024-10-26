import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends CrudService<any> {
  override API_URL = `${environment.API_URL}/v1/sales/order`;
  API_URL_A = `${environment.API_URL}/v1`;
  constructor(
    @Inject(HttpClient) http: HttpClient,
    public override alertService: AlertService
  ) {
    super(http, alertService);
  }

  override async create(form: any) {
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

  async newState(form: any) {
    try {
      const formData = await this.alertService.toUrlEncoded(form);
      const response = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}/new/state`, formData, {
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

  async getDeliveries() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/deliveries`, {
          observe: 'response',
        })
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

  async getPayments() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/payments`, {
          observe: 'response',
        })
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

  async getDepartamentos() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL_A}/address/departament`, {
          observe: 'response',
        })
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

  async postDetal(form: any) {
    try {
      const formData = await this.toUrlEncodedArr(form);
      const response = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}/payment/detail`, formData, {
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
