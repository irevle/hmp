import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { TentangPageRoutingModule } from './tentang-routing.module';

import { TentangPage } from './tentang.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TentangPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TentangPage]
})
export class TentangPageModule {}
