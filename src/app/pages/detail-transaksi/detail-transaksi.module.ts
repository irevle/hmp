import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { DetailTransaksiPageRoutingModule } from './detail-transaksi-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { DetailTransaksiPage } from './detail-transaksi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTransaksiPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DetailTransaksiPage],
})
export class DetailTransaksiPageModule {}
