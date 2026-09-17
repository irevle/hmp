import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module')
        .then(m => m.HomePageModule)
  },

  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module')
        .then(m => m.TabsPageModule)
  },

  {
    // PERUBAHAN: ditambahkan :id untuk detail produk
    path: 'detail-produk/:id',
    loadChildren: () =>
      import('./pages/detail-produk/detail-produk.module')
        .then(m => m.DetailProdukPageModule)
  },

  {
    path: 'tambah-produk',
    loadChildren: () =>
      import('./pages/tambah-produk/tambah-produk.module')
        .then(m => m.TambahProdukPageModule)
  },

  {
    path: 'edit-produk',
    loadChildren: () =>
      import('./pages/edit-produk/edit-produk.module')
        .then(m => m.EditProdukPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }