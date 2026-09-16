// ambil KeranjangItem  keranjang-item.model.ts
import { KeranjangItem } from './keranjang-item.model';
export interface Transaksi {
      id: number;
      items: KeranjangItem[];
      total: number;
      tanggal: Date;
}
