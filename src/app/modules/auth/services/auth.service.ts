import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = `${environment.API_URL}/v1/auth`;
  API_URL_R = `${environment.API_URL}/v1`;

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
    console.log(localStorage.getItem('user')!);

    const storedUser = JSON.parse(localStorage.getItem('user')!);
    const storedToken = localStorage.getItem('accessToken');
    if (storedUser && storedToken) {
      this.currentUserSubject.next(storedUser);
    }
  }

  async loginO(form: any) {
    try {
      const formData = await this.toUrlEncoded(form);
      const response = await firstValueFrom(
        this.http.post<any>(`${this.API_URL}/login`, formData, {
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

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap((response) => {
        this.storeSession(response.records.accessToken, response.records.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  private storeSession(token: string, user: any) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  toUrlEncoded(obj: any): string {
    return Object.keys(obj)
      .map((key) => {
        const value = obj[key];
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }
}
