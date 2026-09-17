import { Injectable } from '@angular/core';
import { Produk } from '../models/produk.model';
import { KeranjangItem } from '../models/keranjang-item.model';
@Injectable({
  providedIn: 'root',
})
export class KeranjangService {
  // menyimpan seleruh item yang ada dlm kerenjang 
  private items: KeranjangItem[] = [];

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
}


// Menghapus produk dari keranjang berdasarkan ID 
hapus(produkId: number): void {

  // Menyimpan kembali semua item kecuali produk id yg mau di hapus
  this.items = this.items.filter(
    item => item.produk.id !== produkId
  );
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
}
}
