import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/lazy';

import { KeranjangService } from '../../services/keranjang.service';
import { TransaksiService } from '../../services/transaksi.service';
import { KeranjangItem } from '../../models/keranjang-item.model';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  items: KeranjangItem[] = [];
  total: number = 0;
  isSaving: boolean = false; // ← state loading saat checkout

  constructor(
    private keranjang: KeranjangService,
    private transaksi: TransaksiService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  refresh(): void {
    this.items = this.keranjang.getItems();
    this.total = this.keranjang.getTotal();
  }

  tambahQty(id: number): void {
    this.keranjang.ubahJumlah(id, 1);
    this.refresh();
  }

  kurangQty(id: number): void {
    this.keranjang.ubahJumlah(id, -1);
    this.refresh();
  }

  hapus(id: number): void {
    this.keranjang.hapus(id);
    this.refresh();
  }

  konfirmasi(): void {
    if (this.items.length === 0 || this.isSaving) {
      return;
    }
    this.isSaving = true;

    // ← sekarang di-subscribe, POST dikirim ke server
    this.transaksi.simpan(this.items, this.total).subscribe({
      next: (tr) => {
        this.keranjang.kosongkan();
        this.refresh();
        this.isSaving = false;
        // ← redirect ke detail transaksi dengan ID baru dari server
        this.router.navigate(['/tabs/detail-transaksi', tr.id]);
      },
      error: () => {
        this.isSaving = false;
        // error sudah dihandle oleh error interceptor (toast otomatis)
      }
    });

    /*this.keranjang.kosongkan();

    this.refresh();

    this.router.navigate([
      '/tabs/riwayat-transaksi'
    ]);*/
  }
}