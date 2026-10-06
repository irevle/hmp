import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../../models/transaksi.model';
import { ActivatedRoute } from '@angular/router';
import { TransaksiService } from '../../services/transaksi.service';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
  standalone: false,
})
export class DetailTransaksiPage implements OnInit {
  transaksi?: Transaksi;
  constructor(
    private route: ActivatedRoute,
    private transaksiSvc: TransaksiService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.transaksi = this.transaksiSvc.getById(id);
    });
  }

  jumlahItem(): number {
    if (!this.transaksi) return 0;
    return this.transaksi.items.reduce((total, item) => total + item.jumlah, 0);
  }
}
