import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { KeranjangService } from '../../services/keranjang.service';
import { Produk } from '../../models/produk.model';
import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular/lazy';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
  standalone: false,
})
export class DetailProdukPage  {
  // Variabel untuk menampung 1 detail produk
  produk: Produk | undefined;
  status$ = new BehaviorSubject('memuat');
  pesan = '';
  private bacaan?: Subscription;
  constructor(// Inject ActivatedRoute & ProdukService
    private route: ActivatedRoute,
    private produkService: ProdukService,
    private keranjangService: KeranjangService,
    private router: Router,
    private api: ApiService,
    private alert: AlertController,
  ) { }
  ionViewDidEnter() {
  this.bacaan?.unsubscribe();
  this.produk = undefined;
  this.pesan = '';
  this.status$.next('memuat');

  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    this.pesan = 'ID produk tidak ditemukan.';
    this.status$.next('gagal');
    return;
  }

  this.bacaan = this.api.get<Produk>('/produk/' + encodeURIComponent(id)).subscribe({
    next: produk => {
      this.produk = produk;
      this.status$.next('siap');
    },
     error: err => {
        this.pesan = err.status === 404
          ? 'Produk tidak ditemukan.'
          : 'Gagal memuat detail produk.';
        this.status$.next('gagal');
      },
    });
  }
   
  

  async konfirmasiHapus() {
  const p = this.produk;
  if (!p || this.status$.value !== 'siap') return;

  this.status$.next('konfirmasi');
  const dialog = await this.alert.create({
    header: 'Hapus produk?',
    message: 'Produk ini akan dihapus dari server.',
    buttons: [
      { text: 'Batal', role: 'cancel' },
      { text: 'Hapus', role: 'destructive' },
    ],
  });

  await dialog.present();
  const hasil = await dialog.onDidDismiss();

  if (hasil.role !== 'destructive') {
    this.status$.next('siap');
    return;
  }

  this.pesan = '';
  this.status$.next('menghapus');
  this.produkService.hapus(p.id).subscribe({
    next: () => {
      this.keranjangService.hapus(p.id);
      void this.router.navigateByUrl('/tabs/produk', { replaceUrl: true });
    },
    error: () => {
      this.pesan = 'Gagal menghapus produk. Silakan coba lagi.';
      this.status$.next('siap');
    },
  });

}

  
  
  tambahKeKeranjang() {
  if (this.produk && this.produk.stok > 0 && this.status$.value === 'siap') {
      this.keranjangService.tambah(this.produk, 1);
      this.router.navigate(['/tabs/keranjang']);
    }
  }
}
