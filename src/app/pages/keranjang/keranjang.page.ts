import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private keranjang: KeranjangService,
    private transaksi: TransaksiService,
    private router: Router,
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
    if (this.items.length === 0) {
      return;
    }

    this.transaksi.simpan(
      this.items,
      this.total
    );

    this.keranjang.kosongkan();

    this.refresh();

    this.router.navigate([
      '/tabs/riwayat-transaksi'
    ]);
  }
}