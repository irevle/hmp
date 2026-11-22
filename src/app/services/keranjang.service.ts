import { Injectable } from '@angular/core';
import { Produk } from '../models/produk.model';
import { KeranjangItem } from '../models/keranjang-item.model';
@Injectable({
  providedIn: 'root',
})
export class KeranjangService {
  private readonly STORAGE_KEY = 'simobile-keranjang';

  // menyimpan seleruh item yang ada dlm kerenjang 
  private items: KeranjangItem[] = [];

  constructor() {
    this.restore(); // ← restore dari localStorage saat service dibuat
  }

  private simpan(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  }
  private restore(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    this.items = raw ? JSON.parse(raw) : [];
  }

  getItems(): KeranjangItem[] {
  return this.items;
  }
   // defaultnay menjadi 1 
  tambah(produk: Produk,jumlah:number=1): void {

     if (jumlah <= 0) {
      return;
    }
    const item = this.items.find(
      item => item.produk.id === produk.id
    );

    if (item) {
      item.jumlah += jumlah;
    } else {
      this.items.push({
        produk: produk,
        jumlah: jumlah
      });
    }
    this.simpan();
  }

  // Menghapus produk dari keranjang berdasarkan ID 
  hapus(produkId: number): void {

    // Menyimpan kembali semua item kecuali produk id yg mau di hapus
    this.items = this.items.filter(
      item => item.produk.id !== produkId
    );
    this.simpan();
  }

  ubahJumlah(produkId: number,delta:number): void {
  const item = this.items.find(
        item => item.produk.id === produkId
      );

      if (!item) {
        return;
      }
      const jumlahBaru = item.jumlah + delta;

      if (jumlahBaru <= 0) {
        this.hapus(produkId);
        return;
      }

      item.jumlah = jumlahBaru;
      this.simpan();
  }

  // Menghitung total harga seluruh produk di keranjang
  getTotal(): number {
    // Menjumlahkan harga jual dikali jumlah setiap produk
    return this.items.reduce(
      (total, item) =>
        total + (item.produk.hargaJual * item.jumlah),
      0
    );
  }
  // kosongkan seluruh isi keranjang
  kosongkan(): void {
    // Mengganti isi array dengan array kosong
    this.items = [];
    this.simpan();
  }
}
