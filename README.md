# SIMOBILE

Aplikasi kasir (point of sale) berbasis **Ionic + Angular** yang berjalan **sepenuhnya offline**. Dirancang untuk memenuhi kebutuhan kasir kecil: mencatat produk, membangun keranjang belanja, menyimpan riwayat transaksi, dan menampilkan ringkasan penjualan — tanpa memerlukan koneksi internet.

## Daftar Fitur

### 1. Dashboard

- Ringkasan jumlah produk terdaftar
- Total penjualan hari ini (otomatis dihitung dari transaksi hari berjalan)
- Produk terlaris (produk dengan jumlah terjual terbanyak)
- Header kustom dan animasi halaman

### 2. Manajemen Produk

- Daftar produk dummy (minimal 10 produk) yang di-_hardcode_ di dalam service
- Pencarian produk secara _real-time_ (search bar)
- Halaman detail produk (stok, harga beli, harga jual)
- Tambah produk baru
- Edit produk yang sudah ada
- Gambar produk tersimpan lokal di `assets/img/` (termasuk gambar fallback bila URL gambar kosong)

### 3. Keranjang (Transaksi)

- Tambah produk ke keranjang dari halaman detail produk
- Ubah jumlah item (+ / −)
- Hapus item dari keranjang
- Perhitungan total belanja otomatis
- Konfirmasi transaksi → tersimpan ke riwayat dan keranjang dikosongkan

### 4. Riwayat Transaksi

- Daftar seluruh transaksi yang tersimpan (tanggal, total)
- Halaman detail transaksi (daftar item + total per transaksi)
- Data transaksi contoh (_dummy_) tersedia sejak aplikasi dibuka agar dashboard dan riwayat langsung terisi saat demo

### 5. Profil & Pengaturan

- Halaman profil pengguna
- Logout melalui menu drawer (ikon ☰)
- Pengaturan mode gelap (_dark mode_) dengan palet warna kustom

### 6. Offline

- Seluruh gambar produk dimuat dari folder lokal `assets/img/` — tidak ada aset atau _template image_ dari CDN
- Seluruh data disimpan di dalam aplikasi (tanpa panggilan API)

## Kebutuhan Teknis

- **Framework:** Ionic + Angular (berbasis NgModule)
- **UI:** komponen Ionic asli — **tanpa pustaka UI instan** (tidak menggunakan Ionic Angular Material, Bootstrap, Tailwind, dsb.)
- **Struktur folder modular:** `pages/`, `components/`, `services/`, `models/`
- **Gambar:** aset lokal di `src/assets/img/`

## Step Instalasi & Jalankan Aplikasi

1. Pindah ke directory untuk menyimpan project ini, lalu git clone

```sh
git clone https://github.com/irevle/hmp
```

2. Masuk ke folder proyek dan install dependensi

```sh
cd hmp
npm install
```

3. Jalankan server pengembangan

```sh
ionic serve
```

4. Buka browser di http://localhost:8100

> Catatan: bila halaman tampil kosong setelah _pull_ perubahan terbaru, **hard refresh** (Ctrl + Shift + R) untuk membersihkan cache bundle lama di browser. Kalo tidak di hard refresh, bisa jadi page jadi kosong setelah di modifikasi.

## Struktur Proyek

```
src/app/
├── components/    # komponen bersama (custom header, product card, dll.)
├── models/        # interface/model data (Produk, KeranjangItem, Transaksi, dll.)
├── pages/         # halaman-halaman aplikasi (dashboard, produk, keranjang, dll.)
├── services/      # layanan data (ProdukService, KeranjangService, TransaksiService)
└── tabs/          # navigasi tab bawah
```
