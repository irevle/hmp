import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Produk } from '../models/produk.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProdukService {
  constructor(private readonly api: ApiService) {}

  getAll(): Observable<Produk[]> {
    return this.api.get<Produk[]>('/produk');
  }

  getById(id: number): Observable<Produk> {
    return this.api.get<Produk>(`/produk/${id}`);
  }

  cariNama(keyword: string): Observable<Produk[]> {
    const kata = keyword.toLowerCase().trim();
    return this.getAll().pipe(
      map((daftar) =>
        daftar.filter((produk) => produk.nama.toLowerCase().includes(kata)),
      ),
    );
  }

  tambah(produk: Omit<Produk, 'id'>): Observable<Produk> {
    return this.api.post<Produk>('/produk', produk);
  }

  update(id: number, dataBaru: Produk): Observable<Produk> {
    return this.api.put<Produk>(`/produk/${id}`, dataBaru);
  }

  hapus(id: number): Observable<void> {
    return this.api.delete<void>(`/produk/${id}`);
  }

  getJumlahProduk(): Observable<number> {
    return this.getAll().pipe(map((daftar) => daftar.length));
  }
}
