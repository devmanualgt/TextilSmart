import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
        showCancelButton: btnCancel === null ? false : true,
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

  close() {
    Swal.close();
  }
}
