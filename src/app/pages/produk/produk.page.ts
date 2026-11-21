import { Component } from '@angular/core';
import { ProdukService } from '../../services/produk.service'
import { Produk } from '../../models/produk.model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage {
  daftarProduk: Produk[] = [];
  keyword: string = '';
  status$ = new BehaviorSubject('memuat');
private semuaProduk: Produk[] = [];
private bacaan?: Subscription;

  constructor(private produkservice: ProdukService) { }

  ionViewDidEnter() {
  this.loadProduk();
}

loadProduk() {
  this.bacaan?.unsubscribe();
  this.status$.next('memuat');

  this.bacaan = this.produkservice.getAll().subscribe({
    next: data => {
      this.semuaProduk = data;
      this.filterProduk();
      this.status$.next('siap');
    },
    error: () => this.status$.next('gagal'),
  });
}

onSearch(event: any) {
  this.keyword = event.detail.value ?? '';
  this.filterProduk();
}

private filterProduk() {
  const kata = this.keyword.trim().toLowerCase();
  this.daftarProduk = this.semuaProduk.filter(
    p => p.nama.toLowerCase().includes(kata)
  );
}

}
