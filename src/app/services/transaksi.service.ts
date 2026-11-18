import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeranjangItem } from '../models/keranjang-item.model';
import { Transaksi } from '../models/transaksi.model';
import { TransaksiItem } from '../models/transaksi-item.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TransaksiService {
  constructor(private readonly api: ApiService) {}

  getAll(): Observable<Transaksi[]> {
    return this.api.get<Transaksi[]>('/transaksi');
  }

  getById(id: number): Observable<Transaksi> {
    return this.api.get<Transaksi>(`/transaksi/${id}`);
  }

  simpan(items: KeranjangItem[], total: number): Observable<Transaksi> {
    return this.api.post<Transaksi>('/transaksi', {
      tanggal: new Date().toISOString(),
      total,
      pelanggan: { nama: 'Pelanggan' },
      items: items.map((item) => this.buatItem(item)),
    });
  }

  hitungTotalHariIni(list: Transaksi[]): number {
    const hariIni = new Date();

    return list
      .filter((transaksi) => {
        const tanggal = new Date(transaksi.tanggal);
        return (
          tanggal.getFullYear() === hariIni.getFullYear() &&
          tanggal.getMonth() === hariIni.getMonth() &&
          tanggal.getDate() === hariIni.getDate()
        );
      })
      .reduce((total, transaksi) => total + transaksi.total, 0);
  }

  cariTerlaris(list: Transaksi[]): TransaksiItem | null {
    const akumulasi: Record<number, { item: TransaksiItem; jumlah: number }> =
      {};

    list.forEach((transaksi) =>
      transaksi.items.forEach((item) => {
        const entry = akumulasi[item.produkId];
        if (entry) {
          entry.jumlah += item.jumlah;
        } else {
          akumulasi[item.produkId] = { item, jumlah: item.jumlah };
        }
      }),
    );

    const semua = Object.values(akumulasi);
    if (semua.length === 0) return null;

    return semua.reduce((a, b) => (b.jumlah > a.jumlah ? b : a)).item;
  }

  private buatItem(item: KeranjangItem): TransaksiItem {
    return {
      produkId: item.produk.id,
      nama: item.produk.nama,
      hargaJual: item.produk.hargaJual,
      jumlah: item.jumlah,
      subtotal: item.produk.hargaJual * item.jumlah,
    };
  }
}
