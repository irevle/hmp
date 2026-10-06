import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../../models/transaksi.model';
import { Router } from '@angular/router';
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

  ngOnInit() {}

  // jalan tiap kali halaman dibuka, biar transaksi baru langsung muncul tanpa reload
  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.daftarTransaksi = [...this.transaksiSvc.getAll()].reverse();
  }

  jumlahItem(t: Transaksi): number {
    return t.items.reduce((total, item) => total + item.jumlah, 0);
  }

  lihatDetail(t: Transaksi) {
    this.router.navigate(['/tabs/detail-transaksi', t.id]);
  }
}
