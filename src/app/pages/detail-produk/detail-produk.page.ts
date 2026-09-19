import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { KeranjangService } from '../../services/keranjang.service';
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
  standalone: false,
})
export class DetailProdukPage implements OnInit {
  // Variabel untuk menampung 1 detail produk
  produk: Produk | undefined;
  public alertButtons = ['OK'];
  isAlertOpen = false;

  constructor(// Inject ActivatedRoute & ProdukService
    private route: ActivatedRoute,
    private produkService: ProdukService,
    private keranjangService: KeranjangService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.produk = this.produkService.getById(id);
    });
  }
  tambahKeKeranjang() {
    if (this.produk) {
      this.keranjangService.tambah(this.produk, 1);
      this.isAlertOpen = true;
    }
  }
}
