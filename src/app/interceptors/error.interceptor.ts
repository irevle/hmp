import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular/lazy';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastController = inject(ToastController);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const pesan =
        error.status === 0
          ? 'Tidak dapat terhubung ke server. Periksa koneksi internet.'
          : `Gagal memuat data (kode ${error.status}). Silakan coba lagi.`;

      void toastController
        .create({
          message: pesan,
          color: 'danger',
          duration: 3500,
          position: 'top',
        })
        .then((toast) => toast.present());

      return throwError(() => error);
    }),
  );
};
