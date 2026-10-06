import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { TransaksiService } from '../../services/transaksi.service';
import { Produk } from '../../models/produk.model';
import { AnimationController } from '@ionic/angular/lazy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  jumlahProduk = 0;
  totalHariIni = 0;
  terlaris: Produk | null = null;

  constructor(
    private produkService: ProdukService,
    private transaksiService: TransaksiService,
    private router: Router,
    private animationCtrl: AnimationController,
  ) {}

  ngOnInit() {
    this.muatRingkasan();
  }

  ionViewWillEnter() {
    this.muatRingkasan();
  }

  muatRingkasan(): void {
    this.jumlahProduk = this.produkService.getJumlahProduk();
    this.totalHariIni = this.transaksiService.getTotalHariIni();
    this.terlaris = this.transaksiService.getProdukTerlaris();
    this.animasiTerlaris();
  }

  bukaDetail(produkId: number): void {
    this.router.navigate(['/detail-produk', produkId]);
  }

  ionViewDidEnter() {
    this.animasiMasuk();
  }

  animasiMasuk(): void {
    const kartu = document.querySelectorAll('.ringkasan-card');
    if (!kartu.length) {
      return;
    }
    const animasi = this.animationCtrl
      .create()
      .addElement(kartu)
      .duration(600)
      .easing('ease-out')
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(24px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0)' },
      ]);
    animasi.play();
  }

  animasiTerlaris(): void {
    const el = document.querySelector('.terlaris-wrap');
    if (!el) {
      return;
    }
    const animasi = this.animationCtrl
      .create()
      .addElement(el)
      .duration(500)
      .easing('ease-in-out')
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0.92)' },
        { offset: 0.6, opacity: '1', transform: 'scale(1.03)' },
        { offset: 1, opacity: '1', transform: 'scale(1)' },
      ]);
    animasi.play();
  }
}
