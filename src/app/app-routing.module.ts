import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
  // ganti home dengan tabs ketika serve lgs ke dashboard
  path: '',
  redirectTo: 'tabs/dashboard',
  pathMatch: 'full'
  },

  {
  
     // hapus yang di melalui tabs dashboard,produk,transaksi,profil
     path: 'tabs',
     loadChildren: () =>
       import('./pages/tabs/tabs.module')
      .then(m => m.TabsPageModule)
  },
  
  {
    path: 'detail-produk',
    loadChildren: () => import('./pages/detail-produk/detail-produk.module').then( m => m.DetailProdukPageModule)
  },
  {
    path: 'tambah-produk',
    loadChildren: () => import('./pages/tambah-produk/tambah-produk.module').then( m => m.TambahProdukPageModule)
  },
  {
    path: 'edit-produk',
    loadChildren: () => import('./pages/edit-produk/edit-produk.module').then( m => m.EditProdukPageModule)
  },
 
  {
    path: 'riwayat-transaksi',
    loadChildren: () => import('./pages/riwayat-transaksi/riwayat-transaksi.module').then( m => m.RiwayatTransaksiPageModule)
  },
  {
    path: 'detail-transaksi',
    loadChildren: () => import('./pages/detail-transaksi/detail-transaksi.module').then( m => m.DetailTransaksiPageModule)
  },
  {
    path: 'pengaturan',
    loadChildren: () => import('./pages/pengaturan/pengaturan.module').then( m => m.PengaturanPageModule)
  },
  {
    path: 'tentang',
    loadChildren: () => import('./pages/tentang/tentang.module').then( m => m.TentangPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
