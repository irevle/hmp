import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/lazy';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produk } from '../../models/produk.model';

@Injectable()
export class FormProdukService {
  readonly status$ = new BehaviorSubject('siap');
  readonly bawaan = 'assets/img/no-image.png';
  pesan = '';

  constructor(private toast: ToastController, private router: Router) {}

  private async kameraDitolak(): Promise<boolean> {
    try {
      return (await Camera.checkPermissions()).camera === 'denied';
    } catch {
      return false;
    }
  }

  async pilihFoto(form: FormGroup, galeri = false) {
    if (this.status$.value !== 'siap') return;

    this.status$.next('foto');
    this.pesan = '';
    const pesanIzin = 'Izin kamera ditolak. Pilih dari galeri atau gunakan gambar default.';

    try {
      if (!galeri && await this.kameraDitolak()) {
        this.pesan = pesanIzin;
        return;
      }

      await defineCustomElements(window);
      const foto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: galeri ? CameraSource.Photos : CameraSource.Prompt,
        width: 800,
        quality: 70,
      });

      if (foto.dataUrl) form.patchValue({ gambar: foto.dataUrl });
    } catch (err) {
      if (!galeri && await this.kameraDitolak()) {
        this.pesan = pesanIzin;
      } else if (!/cancel|batal/i.test(String(err))) {
        this.pesan = 'Foto gagal dibuka. Periksa izin atau gunakan gambar default.';
      }
    } finally {
      this.status$.next('siap');
    }
  }

  pakaiDefault(form: FormGroup) {
    form.patchValue({ gambar: '' });
    this.pesan = '';
  }

  baca(form: FormGroup): Omit<Produk, 'id'> | null {
    if (this.status$.value !== 'siap') return null;

    for (const nama of ['nama', 'kategori']) {
      const kontrol = form.get(nama);
      kontrol?.setValue(String(kontrol.value ?? '').trim());
    }
    if (form.invalid) return null;

    const v = form.getRawValue();
    return {
      nama: v.nama,
      kategori: v.kategori,
      hargaBeli: Number(v.hargaBeli),
      hargaJual: Number(v.hargaJual),
      stok: Number(v.stok),
      gambar: v.gambar?.trim() || this.bawaan,
    };
  }

  simpan(form: FormGroup, request: Observable<Produk>, pesanSukses: string) {
    if (this.status$.value !== 'siap' || form.invalid) return;

    this.pesan = '';
    this.status$.next('menyimpan');
    form.disable();

    request.subscribe({
      next: async () => {
        const toast = await this.toast.create({
          message: pesanSukses,
          color: 'success',
          duration: 1800,
        });
        await toast.present();
        await this.router.navigateByUrl('/tabs/produk', { replaceUrl: true });
      },
      error: () => {
        form.enable();
        this.pesan = 'Gagal menyimpan. Isian dan foto masih tersedia.';
        this.status$.next('siap');
      },
    });
  }
}