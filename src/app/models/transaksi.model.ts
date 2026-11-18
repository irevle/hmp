import { TransaksiItem } from './transaksi-item.model';
import { Pelanggan } from './pelanggan.model';
export interface Transaksi {
  id: number;
  tanggal: string;
  total: number;
  pelanggan: Pelanggan;
  items: TransaksiItem[];
}
