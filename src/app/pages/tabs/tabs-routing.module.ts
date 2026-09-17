import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module')
            .then(m => m.DashboardPageModule)
      },
      {
        path: 'produk',
        loadChildren: () =>
          import('../produk/produk.module')
            .then(m => m.ProdukPageModule)
      },
      {
        path: 'transaksi',
        loadChildren: () =>
          import('../transaksi/transaksi.module')
            .then(m => m.TransaksiPageModule)
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('../profil/profil.module')
            .then(m => m.ProfilPageModule)
      },
      {
        path: 'keranjang',
        loadChildren: () =>
          import('../keranjang/keranjang.module')
            .then(m => m.KeranjangPageModule)
      },
      {
        path: 'riwayat-transaksi',
        loadChildren: () =>
          import('../riwayat-transaksi/riwayat-transaksi.module')
            .then(m => m.RiwayatTransaksiPageModule)
      },
      {
        // PERUBAHAN: ditambahkan parameter :id
        path: 'detail-transaksi/:id',
        loadChildren: () =>
          import('../detail-transaksi/detail-transaksi.module')
            .then(m => m.DetailTransaksiPageModule)
      },
      {
        path: 'pengaturan',
        loadChildren: () =>
          import('../pengaturan/pengaturan.module')
            .then(m => m.PengaturanPageModule)
      },
      {
        path: 'tentang',
        loadChildren: () =>
          import('../tentang/tentang.module')
            .then(m => m.TentangPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}