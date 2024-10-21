import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class FeedstockService extends CrudService<any> implements OnDestroy {
  override API_URL = `${environment.API_URL}/v1/feedstocks`;
  URL_API = `${environment.API_URL}/v1`;
  constructor(
    @Inject(HttpClient) http: HttpClient,
    public override alertService: AlertService
  ) {
    super(http, alertService);
  }

  async getProviders() {
    let msm;
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.URL_API}/providers`, {
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
        this.http.get<any>(`${this.URL_API}/feedstocks/categories`, {
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

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
