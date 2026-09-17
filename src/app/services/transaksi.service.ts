import { Injectable } from '@angular/core';
import { Transaksi } from '../models/transaksi.model';
import { KeranjangItem } from '../models/keranjang-item.model';
import { Produk } from '../models/produk.model';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  private transaksiList: Transaksi[] = [];

  constructor() { }

  getAll(): Transaksi[] {
    return this.transaksiList;
  }

  getById(id: number): Transaksi | undefined {
    return this.transaksiList.find(
      transaksi => transaksi.id === id
    );
  }

  simpan(items: KeranjangItem[], total: number): void {

    const transaksiBaru: Transaksi = {


      id: this.transaksiList.length + 1,

   
      items: items.map(item => ({
        produk: item.produk,
        jumlah: item.jumlah
      })),

      total: total,

      tanggal: new Date()
    };

    this.transaksiList.push(transaksiBaru);
  }

  getTotalHariIni(): number {
    const hariIni = new Date();

    const transaksiHariIni = this.transaksiList.filter(
      transaksi => {
        const tanggalTransaksi = new Date(transaksi.tanggal);

        return (
          tanggalTransaksi.getFullYear() === hariIni.getFullYear() &&
          tanggalTransaksi.getMonth() === hariIni.getMonth() &&
          tanggalTransaksi.getDate() === hariIni.getDate()
        );
      }
    );

    return transaksiHariIni.reduce(
      (total, transaksi) => total + transaksi.total,
      0
    );
  }

 
  getProdukTerlaris(): Produk | null {

    const jumlahTerjual: {
      produk: Produk;
      jumlah: number;
    }[] = [];

    this.transaksiList.forEach(transaksi => {

      transaksi.items.forEach(item => {

        const dataProduk = jumlahTerjual.find(
          data => data.produk.id === item.produk.id
        );

        if (dataProduk) {
          dataProduk.jumlah += item.jumlah;
        } else {
          jumlahTerjual.push({
            produk: item.produk,
            jumlah: item.jumlah
          });
        }

      });

    });


    if (jumlahTerjual.length === 0) {
      return null;
    }

    let terlaris = jumlahTerjual[0];

    jumlahTerjual.forEach(data => {

      if (data.jumlah > terlaris.jumlah) {
        terlaris = data;
      }

    });

    return terlaris.produk;
  }

}