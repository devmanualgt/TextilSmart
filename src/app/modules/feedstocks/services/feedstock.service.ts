import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedstockService {
  API_URL = `${environment.API_URL}/v1`;
  constructor(private http: HttpClient) {}

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
}
