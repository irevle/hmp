import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { ProdukPageRoutingModule } from './produk-routing.module';

import { ComponentsModule } from '../../components/components.module';
import { ProdukPage } from './produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdukPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ProdukPage],
})
export class ProdukPageModule {}
