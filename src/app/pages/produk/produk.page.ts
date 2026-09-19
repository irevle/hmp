import { Component, OnInit } from '@angular/core';
import { ProdukService } from '../../services/produk.service'
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  daftarProduk: Produk[] = [];
  keyword: string = '';

  constructor(private produkservice: ProdukService) { }

  ngOnInit() {
    this.loadProduk();
  }

  loadProduk() {
    this.daftarProduk = this.produkservice.getAll();
  }

  // Menggunakan method cariNama dari ProdukService
  onSearch(event: any) {
    this.keyword = event.detail.value;

    if (this.keyword && this.keyword.trim() !== '') {
      this.daftarProduk = this.produkservice.cariNama(this.keyword);
    } else {
      this.loadProduk();
    }
  }

}
