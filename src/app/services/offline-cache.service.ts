import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Produk } from '../models/produk.model';

@Injectable({
  providedIn: 'root',
})
export class OfflineCacheService extends Dexie {
  produkStore!: Table<Produk, number>;

  constructor() {
    super('simobile-db');

    // Schema tabel 'produk' dengan primary key 'id'
    this.version(1).stores({
      produk: 'id, nama, kategori, hargaJual, stok',
    });

    this.produkStore = this.table('produk');
  }

  // Simpan batch data produk ke IndexedDB
  async simpanProduk(list: Produk[]): Promise<void> {
    await this.transaction('rw', this.produkStore, async () => {
      await this.produkStore.clear();
      await this.produkStore.bulkPut(list);
    });
  }

  // Ambil semua produk dari IndexedDB (pola toArray() persis materi kuliah)
  async ambilProduk(): Promise<Produk[]> {
    return await this.produkStore.toArray();
  }

  // Ambil 1 produk berdasarkan ID
  async ambilProdukById(id: number): Promise<Produk | undefined> {
    return await this.produkStore.get(id);
  }

  // Kosongkan cache
  async hapusCache(): Promise<void> {
    await this.produkStore.clear();
  }
}