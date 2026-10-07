import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Transaksi } from '../../models/transaksi.model';
import { TransaksiService } from '../../services/transaksi.service';

@Component({
  selector: 'app-riwayat-transaksi',
  templateUrl: './riwayat-transaksi.page.html',
  styleUrls: ['./riwayat-transaksi.page.scss'],
  standalone: false,
})
export class RiwayatTransaksiPage implements OnInit {

  daftarTransaksi: Transaksi[] = [];

  constructor(
    private router: Router,
    private transaksiSvc: TransaksiService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ionViewDidEnter(): void {
    this.load();
  }

  load(): void {
    this.daftarTransaksi = [
      ...this.transaksiSvc.getAll()
    ].reverse();
  }

  jumlahItem(t: Transaksi): number {
    return t.items.reduce(
      (total, item) => total + item.jumlah,
      0
    );
  }

  lihatDetail(t: Transaksi): void {
    this.router.navigate([
      '/tabs/detail-transaksi',
      t.id
    ]);
  }
}
