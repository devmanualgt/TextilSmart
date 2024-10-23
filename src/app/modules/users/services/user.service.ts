import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<any>  {
  override API_URL = `${environment.API_URL}/v1/users`;
  constructor(
      @Inject(HttpClient) http: HttpClient,
      public override alertService: AlertService
    ) {
      super(http, alertService);
    }
}
