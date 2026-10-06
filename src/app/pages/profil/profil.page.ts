import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {
  toko = {
    nama: 'Toko Makmur Jaya',
    pemilik: 'Bu Marni',
    kategori: 'Kelontong / Sembako',
    alamat: 'Depok, Jawa Barat',
    telepon: '0812-3456-7890',
  };

  aplikasi = {
    nama: 'SIMOBILE',
    versi: '1.0.0',
    keterangan:
      'Aplikasi kasir mobile untuk mencatat penjualan langsung dari HP, tanpa koneksi internet.',
  };
  constructor() {}

  ngOnInit() {}
}
