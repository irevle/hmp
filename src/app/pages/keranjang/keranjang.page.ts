import { Component, OnInit } from '@angular/core';
import { KeranjangService } from '../../services/keranjang.service';
import { TransaksiService } from '../../services/transaksi.service';
import { Router } from '@angular/router';
import { KeranjangItem } from '../../models/keranjang-item.model';
import { ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.refresh();
  }

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.items = this.keranjang.getItems();
    this.total = this.keranjang.getTotal();
    this.cdr.detectChanges();
  }

  tambahQty(id: number) {
    this.keranjang.ubahJumlah(id, 1);
    this.refresh();
  }

  kurangQty(id: number) {
    this.keranjang.ubahJumlah(id, -1);
    this.refresh();
  }

  hapus(id: number) {
    this.keranjang.hapus(id);
    this.refresh();
  }

  konfirmasi() {
    if (this.items.length === 0) return;

    this.transaksi.simpan(this.items, this.total);
    this.keranjang.kosongkan();
    this.refresh();
    this.router.navigate(['tabs/riwayat-transaksi']);
  }
}
