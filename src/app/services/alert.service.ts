import { ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  alertSimple(
    titulo: string,
    message: string,
    img: 'success' | 'error' | 'warning' | 'info' | 'question',
    btnText: string,
    btnCancel: string,
    dismiss: boolean
  ) {
    return new Promise(async (resolve, reject) => {
      Swal.fire({
        html: message,
        title: titulo,
        text: message,
        icon: img,
        showCancelButton: btnCancel === '' ? false : true,
        confirmButtonText: btnText,
        cancelButtonText: btnCancel,
        confirmButtonColor: '#0e4e94',
        allowOutsideClick: dismiss,
        width: '400px',
      })
        .then((result) => {
          if (result.value) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  loader(titulo: string, message: string, time: number) {
    let timerInterval: number;
    Swal.fire({
      title: titulo,
      html: message,
      timer: time,
      timerProgressBar: true,
      allowOutsideClick: false,
      backdrop: 'swal2-backdrop-show',
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }

  errorAlertNorm(err: any, message: any): Observable<never> {
    let errors_str;
    if (err.error.errors) {
      const array_errors = err.error.errors;
      const errorMessages: any[] = [];
      for (const key in err.error.errors) {
        if (err.error.errors.hasOwnProperty(key)) {
          err.error.errors[key].forEach((message: any) => {
            errorMessages.push(message);
          });
        }
      }
      errors_str = errorMessages.join(', ');
    } else if (err.error.message) {
      errors_str = err.error.message;
    } else {
      errors_str = 'Ocurrio un error, favor contactar con soporte';
    }
    this.alertSimple('Error', errors_str, 'error', 'Aceptar', '', false);
    return throwError(errors_str);
  }

  close() {
    Swal.close();
  }

  formData(formValues: any) {
    const formData = new FormData();
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        const value = formValues[key];
        const serializedValue =
          typeof value === 'object' ? JSON.stringify(value) : value;
        formData.append(key, serializedValue);
      }
    }
    return formData;
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
