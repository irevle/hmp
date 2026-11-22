import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProdukService } from './produk.service';
import { OfflineCacheService } from './offline-cache.service';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  // Event stream untuk memberitahu halaman saat data berhasil disinkronkan kembali
  readonly produkRefresh$ = new Subject<void>();

  constructor(
    private produkService: ProdukService,
    private cache: OfflineCacheService
  ) {
    this.listenNetwork();
  }

  private listenNetwork(): void {
    window.addEventListener('online', () => {
      this.syncSekarang();
    });
  }

  syncSekarang(): void {
    this.produkService.getAll().subscribe({
      next: async (data) => {
        await this.cache.simpanProduk(data);
        this.produkRefresh$.next();
      },
      error: () => {},
    });
  }
}