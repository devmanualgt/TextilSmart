import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  firstValueFrom,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T> {
  protected http: HttpClient;
  public alert: AlertService;

  API_URL = `${environment.API_URL}`;
  constructor(http: HttpClient, public alertService: AlertService) {
    this.http = http;
    this.alert = alertService;
  }

  async create(form: any) {
    try {
      const formData = await this.alertService.toUrlEncoded(form);
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

  // READ (Returning filtered list of entities)
  async find() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.API_URL}`, {
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

  // UPDATE
  async update(form: any, id: string) {
    try {
      const formData = await this.alertService.toUrlEncoded(form);
      const response = await firstValueFrom(
        this.http.put<any>(`${this.API_URL}/${id}`, formData, {
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

  // DELETE
  async delete(id: any) {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(`${this.API_URL}/${id}`, {
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

  toUrlEncoded(obj: any): string {
    return Object.keys(obj)
      .map((key) => {
        const value = obj[key];
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }

  filterDataTable(data: any[], searchText: string): any[] {
    const lowerCaseSearchText = searchText.toLowerCase();
  
    return data.filter(item => {
      return Object.values(item).some(value => {
        // Verificar si el valor no es null ni undefined y si es un string, número o booleano
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(lowerCaseSearchText);
        }
        return false;
      });
    });
  }
  
  

}
