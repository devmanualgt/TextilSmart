import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedstockService {
  API_URL = `${environment.API_URL}/v1`;
  constructor(private http: HttpClient, private alertService: AlertService) {}

  async getFeedStock() {
    let msm;
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/feedstocks`, {
          observe: 'response',
        })
      );

      if (response?.ok) {
        return { status: true, data: response.body['records'] };
      } else {
        return { status: false };
      }
    } catch (error) {
      // this.handlerError.errorAlertNorm(error, msm);
      return { status: false };
    }
  }

  async getProviders() {
    let msm;
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/providers`, {
          observe: 'response',
        })
      );

      if (response?.ok) {
        return { status: true, data: response.body['records'] };
      } else {
        return { status: false };
      }
    } catch (error) {
      // this.handlerError.errorAlertNorm(error, msm);
      return { status: false };
    }
  }

  async getCategories() {
    let msm;
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}/feedstocks/categories`, {
          observe: 'response',
        })
      );

      if (response?.ok) {
        return { status: true, data: response.body['records'] };
      } else {
        return { status: false };
      }
    } catch (error) {
      // this.handlerError.errorAlertNorm(error, msm);
      return { status: false };
    }
  }

  async postFeedStock(form: Object) {
    let msm;
    try {
      const formData = await this.alertService.toUrlEncoded(form);
      console.log(formData);

      const response = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}/feedstocks`, formData, {
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
