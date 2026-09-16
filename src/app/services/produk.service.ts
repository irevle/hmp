import { Injectable } from '@angular/core';
 // ambil interface produk 
import { Produk } from '../models/produk.model';
@Injectable({
  providedIn: 'root',
})
export class ProdukService {
  // isi data  arry
  private produkList: Produk[] = [

  // Produk 1
  {
    id: 1,
    nama: 'Beras Premium',
    kategori: 'Makanan',
    stok: 20,
    hargaBeli: 55000,
    hargaJual: 65000,
    // data dummy 
    gambar: 'https://placehold.co/300x200?text=Beras'
  },


  {
    id: 2,
    nama: 'Minyak Goreng',
    kategori: 'Makanan',
    stok: 15,
    hargaBeli: 16000,
    hargaJual: 19000,
    gambar: 'https://placehold.co/300x200?text=Minyak'
  },


  {
    id: 3,
    nama: 'Gula Pasir',
    kategori: 'Makanan',
    stok: 12,
    hargaBeli: 14000,
    hargaJual: 17000,
    gambar: 'https://placehold.co/300x200?text=Gula'
  },

 
  {
    id: 4,
    nama: 'Kopi Sachet',
    kategori: 'Minuman',
    stok: 30,
    hargaBeli: 2000,
    hargaJual: 3000,
    gambar: 'https://placehold.co/300x200?text=Kopi'
  },

  
  {
    id: 5,
    nama: 'Teh Celup',
    kategori: 'Minuman',
    stok: 18,
    hargaBeli: 7000,
    hargaJual: 9500,
    gambar: 'https://placehold.co/300x200?text=Teh'
  },

  
  {
    id: 6,
    nama: 'Susu UHT',
    kategori: 'Minuman',
    stok: 10,
    hargaBeli: 6000,
    hargaJual: 8000,
    gambar: 'https://placehold.co/300x200?text=Susu'
  },

  
  {
    id: 7,
    nama: 'Mie Instan',
    kategori: 'Makanan',
    stok: 40,
    hargaBeli: 2500,
    hargaJual: 3500,
    gambar: 'https://placehold.co/300x200?text=Mie'
  },


  {
    id: 8,
    nama: 'Air Mineral',
    kategori: 'Minuman',
    stok: 25,
    hargaBeli: 3000,
    hargaJual: 5000,
    gambar: 'https://placehold.co/300x200?text=Air'
  },

  
  {
    id: 9,
    nama: 'Sabun Mandi',
    kategori: 'Kebutuhan Rumah',
    stok: 0,
    hargaBeli: 4000,
    hargaJual: 6000,
    gambar: 'https://placehold.co/300x200?text=Sabun'
  },

 
  {
    id: 10,
    nama: 'Pasta Gigi',
    kategori: 'Kebutuhan Rumah',
    stok: 8,
    hargaBeli: 8000,
    hargaJual: 11000
  }

];
 // Mengambil data produk
  getAll(): Produk[] {

    // Mengembalikan data di produkList
    return this.produkList;
  }
  // mengambil semua data yg ada di produk lsit
  getById(id: number): Produk | undefined {

  // Mencari produk yang memiliki id sama dengan parameter id
  return this.produkList.find(
    produk => produk.id === id
  );
}
cariNama(keyword: string): Produk[] {


  // mengubah kata(searh) menjadi huruf kecil trim menghapus spasi
  const kata = keyword.toLowerCase().trim();

  
  return this.produkList.filter(
    produk => produk.nama.toLowerCase().includes(kata)
  );
 }

  // Menambahkan produk baru ke dalam daftar product
tambah(produk: Produk): void {

  // Menambahkan data produk ke akhir arry produkList
  this.produkList.push(produk);
}

update(id: number, dataBaru: Produk): boolean {

  // Mencari index produk yang memiliki ID yang sama
  const index = this.produkList.findIndex(
    produk => produk.id === id
  );

  // Jika produk tidak ditemukan menghasilkan -1
  if (index === -1) {
    return false;
  }

  // Mengganti data produk lama dengan data baru
  this.produkList[index] = dataBaru;

 
  return true;
}
getJumlahProduk(): number {

  return this.produkList.length;
}
}
