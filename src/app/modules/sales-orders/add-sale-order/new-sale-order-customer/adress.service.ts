import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { OrdersService } from '../../services/orders.service';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  protected http: HttpClient;
  public alert: AlertService;
  API_URL = "https://api-textil-umg.vercel.app/api/v1/address/departament";

  constructor(
    http: HttpClient, 
    public alertService: AlertService,
    private orderService: OrdersService
  ) {
    this.http = http;
    this.alert = alertService;
   }

  getAddress(): Observable<any> {
    return this.http.get<any>(this.API_URL, { observe: 'response' }).pipe(
      catchError(error => {
        this.alertService.errorAlertNorm(error, error);
        return of({ status: false }); // Retorna un valor por defecto en caso de error
      })
    );
  }

  



}
