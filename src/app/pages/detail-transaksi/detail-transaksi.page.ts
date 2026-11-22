import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../../models/transaksi.model';
import { ActivatedRoute } from '@angular/router';
import { TransaksiService } from '../../services/transaksi.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
  standalone: false,
})
export class DetailTransaksiPage{
  transaksi?: Transaksi;
  isLoading: boolean = false;
  isError: boolean = false;
  private bacaan?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private transaksiSvc: TransaksiService,
  ) {}

  ionViewDidEnter() {
    this.bacaan?.unsubscribe();
    this.transaksi = undefined;
    this.isLoading = true;
    this.isError = false;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bacaan = this.transaksiSvc.getById(id).subscribe({
      next: (data) => {
        this.transaksi = data;
        this.isLoading = false;
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  jumlahItem(): number {
    if (!this.transaksi) return 0;
    return this.transaksi.items.reduce((total, item) => total + item.jumlah, 0);
  }
}
