import { Injectable } from '@angular/core';
import { Produk } from '../models/produk.model';

@Injectable({
  providedIn: 'root',
})
export class ProdukService {

  private produkList: Produk[] = [


    {
      id: 1,
      nama: 'Beras Premium',
      kategori: 'Makanan',
      stok: 20,
      hargaBeli: 55000,
      hargaJual: 65000,


      gambar: 'assets/img/no-image.png'
    },

    {
      id: 2,
      nama: 'Minyak Goreng',
      kategori: 'Makanan',
      stok: 15,
      hargaBeli: 16000,
      hargaJual: 19000,

     
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 3,
      nama: 'Gula Pasir',
      kategori: 'Makanan',
      stok: 12,
      hargaBeli: 14000,
      hargaJual: 17000,

    
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 4,
      nama: 'Kopi Sachet',
      kategori: 'Minuman',
      stok: 30,
      hargaBeli: 2000,
      hargaJual: 3000,

  
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 5,
      nama: 'Teh Celup',
      kategori: 'Minuman',
      stok: 18,
      hargaBeli: 7000,
      hargaJual: 9500,

     
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 6,
      nama: 'Susu UHT',
      kategori: 'Minuman',
      stok: 10,
      hargaBeli: 6000,
      hargaJual: 8000,

    
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 7,
      nama: 'Mie Instan',
      kategori: 'Makanan',
      stok: 40,
      hargaBeli: 2500,
      hargaJual: 3500,

    
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 8,
      nama: 'Air Mineral',
      kategori: 'Minuman',
      stok: 25,
      hargaBeli: 3000,
      hargaJual: 5000,

    
      gambar: 'assets/img/no-image.png'
    },

    {
      id: 9,
      nama: 'Sabun Mandi',
      kategori: 'Kebutuhan Rumah',
      stok: 0,
      hargaBeli: 4000,
      hargaJual: 6000,

   
      gambar: 'assets/img/no-image.png'
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

 
  getAll(): Produk[] {

    return this.produkList;
  }

  
  getById(id: number): Produk | undefined {

    
    return this.produkList.find(
      produk => produk.id === id
    );
  }

  cariNama(keyword: string): Produk[] {

  
    const kata = keyword.toLowerCase().trim();

    return this.produkList.filter(
      produk => produk.nama.toLowerCase().includes(kata)
    );
  }

  
  tambah(produk: Produk): void {

    
    this.produkList.push(produk);
  }

  update(id: number, dataBaru: Produk): boolean {

    
    const index = this.produkList.findIndex(
      produk => produk.id === id
    );

    
    if (index === -1) {
      return false;
    }

    
    this.produkList[index] = dataBaru;

    return true;
  }

  getJumlahProduk(): number {
    return this.produkList.length;
  }
}