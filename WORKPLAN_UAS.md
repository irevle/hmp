# Rencana Kerja — UAS Project SIMOBILE

Lanjutan dari UTS. Semua fitur UTS tetap jalan, sekarang ditambah 8 tuntutan UAS
(server, nested JSON, CRUD persist, Local Storage, kamera, IndexedDB, PWA, peta cabang).

## Status Awal

- UTS selesai dan sudah di-push (`main` bersih).
- Belum ada satu pun fitur UAS di kode:
  - belum ada `HttpClient` / pemanggilan API,
  - belum ada `@capacitor/camera`,
  - belum ada Leaflet,
  - belum ada manifest / service worker / splash,
  - belum ada IndexedDB,
  - data produk & transaksi masih in-memory (transaksi saja yang disimpan ke localStorage).
- Semua halaman & service sudah ada, tinggal diubah sumber datanya.

## Aturan Main

- **Tanpa branch.** Semua commit langsung ke `main`, pesan commit bahasa Indonesia.
  Beri prefix `[A]`, `[B]`, `[C]`, `[D]` supaya commit history kelihatan pembagiannya.
- Tarik `main` sebelum mulai kerja, hard refresh (`Ctrl+Shift+R`) setelah pull.
- Import Ionic **wajib** dari `@ionic/angular/lazy`.
- **Dilarang pakai `ChangeDetectorRef`.** Refresh halaman pakai `ionViewDidEnter()`.
- File yang disentuh lebih dari satu orang di-commit terakhir oleh pemiliknya (lihat matriks).
- Setiap panggilan API **wajib** punya loading indicator + pesan error yang jelas.
  Dosen bisa mematikan internet kapan saja saat demo.

---

## Keputusan Teknis

1. **Backend: `json-server`** membaca `db.json` di root repo, port `3000`.
   Alasan: tanpa credential, tanpa internet, nested JSON didukung native,
   dan gampang di-reset sebelum demo.
2. **Satu pintu HTTP**: `ApiService` + `HttpLoadingInterceptor` (hitung request aktif)
   + `HttpErrorInterceptor` (toast error). Halaman tidak perlu copy-paste try/catch.
3. **Base URL di `environment.ts`** (`apiUrl`), jangan hardcode di service.
4. **Gambar produk = base64 Data URL** dari Camera, dikompres
   (`width: 800, quality: 70`) supaya `db.json` tidak membengkak.
5. **Peta cabang = section di halaman Dashboard**, bukan halaman baru
   (tidak perlu route/menu baru).
6. Tetap pakai tema, komponen, dan animasi hasil UTS.

Data seed disimpan di `db.seed.json`. `db.json` boleh berubah saat demo,
sediakan `npm run api:reset` untuk mengembalikannya.

---

## Pembagian Peran

### Anggota A — Server & Lapisan Data

**Tuntutan UAS: #1, kontrak #2, sisi service #3, README backend**

Mengerjakan:

- `db.json` + `db.seed.json`:
  - `produk` minimal 10 (variasi kategori, ada stok 0, ada tanpa gambar),
  - `transaksi` dengan `items[]` + `pelanggan{}` (nested),
  - `cabang` minimal 2 (nama, alamat, jam operasional, lat, lng).
- Script `package.json`: `api` (`json-server --watch db.json --port 3000`) dan `api:reset`.
- `src/environments/environment.ts` & `environment.prod.ts` → `apiUrl`.
- `src/app/models/`:
  - `produk.model.ts` (tetap, tambah `deskripsi?` bila perlu),
  - `pelanggan.model.ts` (baru),
  - `transaksi.model.ts` (diubah jadi nested: `items: TransaksiItem[]`, `pelanggan`),
  - `cabang.model.ts` (baru),
  - `keranjang-item.model.ts` tetap untuk keranjang.
- `src/app/services/api.service.ts` (baru): `get/post/put/delete`, expose `loading$`.
- `src/app/interceptors/loading.interceptor.ts` + `error.interceptor.ts` (baru),
  daftarkan lewat `provideHttpClient(withInterceptors([...]))`.
- Rewire `produk.service.ts` & `transaksi.service.ts` ke HTTP.
  Hapus seed in-memory dan persist `transaksiList` di localStorage (pindah ke server).
- Pastikan `npm run api` + `ionic serve` jalan dan `ng build` hijau.
- README: cara install, cara jalankan backend, daftar endpoint + contoh nested JSON,
  catatan kredensial (tidak ada), catatan `10.0.2.2` untuk emulator Android.

Bukti demo: matikan json-server → error jelas; buka `GET /transaksi/1` → JSON nested;
tambah produk → reload/restart → data masih ada.

Pertanyaan oral yang harus bisa dijawab: kenapa pakai interceptor, kenapa `db.json`
bisa disebut nested JSON, beda `PUT` vs `PATCH`, kenapa CORS/port penting,
apa isi `environment.ts`.

---

### Anggota B — Produk & Kamera

**Tuntutan UAS: #3 (sisi UI), #5**

Mengerjakan:

- `pages/produk`: data dari API, skeleton/spinner saat load,
  state error + tombol "Coba Lagi", pencarian tetap jalan.
- `pages/tambah-produk` & `pages/edit-produk`:
  - simpan benar-benar ke server (`POST` / `PUT`),
  - validasi form tetap jalan,
  - toast sukses/gagal, tombol disable saat proses simpan.
- `pages/detail-produk`: konfirmasi hapus → `DELETE`, kembali ke daftar.
- Install `@capacitor/camera`. Tombol "Ambil Foto" di form tambah/edit:
  - `Camera.getPhoto({ resultType: DataUrl, source: Prompt, width: 800, quality: 70 })`,
  - preview gambar sebelum disimpan.
- **Izin kamera ditolak**: tangkap error, tampilkan pesan ramah
  ("Izin kamera ditolak. Pilih dari galeri atau gunakan gambar default"),
  sediakan fallback `assets/img/no-image.png` dan opsi galeri.
- Saat offline / request gagal: jangan simpan setengah jalan, tampilkan pesan jelas.

Bukti demo: tambah produk + foto → restart app → masih ada; hapus → hilang di server;
tolak izin kamera → pesan ramah, bukan crash.

Pertanyaan oral: kenapa `DataUrl` bukan `Uri`, cara mendeteksi izin ditolak,
kenapa foto dikompres, bagaimana halaman tahu request gagal.

---

### Anggota C — Tampilan, PWA & Peta

**Tuntutan UAS: #7, #4 (tema), #8**

Mengerjakan:

- PWA:
  - `ng add @angular/pwa` (kalau tidak kompatibel Angular 22 → setup manual:
    `manifest.webmanifest`, `ngsw-config.json`, `provideServiceWorker`),
  - icon 72–512 px, `theme_color`, `background_color`,
  - pastikan installable di browser/HP.
- **Splash screen (wajib)**: overlay splash di `src/index.html`
  (logo + nama SIMOBILE) yang hilang setelah app siap, plus aset splash.
  Opsional nilai tambah: `@capacitor/splash-screen` untuk build native.
- Fallback offline: `src/offline.html` di-precache di `ngsw-config.json`,
  plus banner/state "Mode Offline" di app.
  Narasi yang benar: app tetap hidup **setelah pernah dibuka/di-install**;
  kunjungan pertama tanpa internet memang tidak mungkin dilayani.
- `PreferenceService` untuk `simobile-dark`: rapikan kode yang sudah ada di
  `app.component.ts` + `pengaturan.page.ts` supaya key-nya tidak dobel.
- **Peta di Dashboard**:
  - `npm i leaflet` + `npm i -D @types/leaflet`, CSS Leaflet di `angular.json`,
  - data dari `GET /cabang` (loading + error),
  - init di `ionViewDidEnter()` setelah data siap, `map.invalidateSize()`,
  - tiap marker `bindPopup(nama + alamat + jam operasional)`.
- Dashboard tetap rapi: produk terlaris top-1, statistik dari API.
- Rapikan `components/*` bila ada yang perlu menyesuaikan data API.

Bukti demo: install PWA, splash muncul, mode offline menampilkan fallback/banner,
klik 2 marker peta dan popup lengkap.

Pertanyaan oral: isi `ngsw-config.json`, kenapa perlu `invalidateSize()`,
kenapa data peta juga lewat API, beda cache service worker vs IndexedDB.

---

### Anggota D — Keranjang, Riwayat & Cache Offline

**Tuntutan UAS: #4 (keranjang), #6, render #2**

Mengerjakan:

- `keranjang.service.ts`: persist ke localStorage key `simobile-keranjang`
  setiap mutasi, restore saat service dibuat, tetap pakai `ionViewDidEnter()`.
- `pages/keranjang`: checkout → `POST /transaksi` (kirim `items[]` + `pelanggan`),
  loading + error, lalu redirect ke detail transaksi.
- `src/app/services/offline-cache.service.ts` (baru), IndexedDB `simobile-db`
  store `produk` keyPath `id`:
  - `simpanProduk(list)`, `ambilProduk()`, `hapusCache()`.
- Alur cache: online → `GET /produk` → simpan ke IndexedDB;
  offline → baca IndexedDB + banner "Data terakhir, belum tersinkron".
- **Auto-sync**: `@capacitor/network` `addListener('networkStatusChange')`
  (+ fallback `window` online/offline) → saat online fetch ulang,
  update IndexedDB, halaman refresh lewat subject/observable.
- `pages/riwayat-transaksi` & `pages/detail-transaksi`:
  render nested JSON (`tr.pelanggan.nama`, `tr.items[].subtotal`) pakai model baru dari A,
  loading + error state.
- `pages/profil`: pastikan tidak ada data in-memory / placeholder.

Bukti demo: isi keranjang → tutup app → masih ada; matikan server → produk terakhir
tetap tampil dari IndexedDB → nyalakan → sync otomatis; detail transaksi nested.

Pertanyaan oral: kenapa IndexedDB bukan localStorage untuk produk,
cara mendeteksi online/offline, apa yang terjadi kalau checkout saat offline,
kenapa pakai `ionViewDidEnter()`.

---

## Matriks Kepemilikan File

| Area | Owner |
|---|---|
| `db.json`, `db.seed.json`, script `api` di `package.json`, `environments/`, `models/`, `services/api.service.ts`, interceptor, `produk.service.ts`, `transaksi.service.ts`, routing/menu, README | A |
| `pages/produk`, `pages/tambah-produk`, `pages/edit-produk`, `pages/detail-produk` | B |
| `manifest.webmanifest`, `ngsw-config.json`, `index.html`, `offline.html`, `assets/icons`, `assets/splash`, `preference.service.ts`, `pages/pengaturan`, `pages/dashboard` (termasuk peta), `components/*` | C |
| `pages/keranjang`, `pages/riwayat-transaksi`, `pages/detail-transaksi`, `pages/profil`, `keranjang.service.ts`, `offline-cache.service.ts`, `sync.service.ts` | D |

Catatan: `app.component.ts` dan `transaksi.service.ts` disentuh A (tema & data).
Kalau C/D butuh perubahan di sana, minta A yang commit.

---

## Kontrak API & Model

`db.seed.json` (bentuk dasar):

```json
{
  "produk": [
    {
      "id": 1,
      "nama": "Kopi",
      "kategori": "Minuman",
      "stok": 10,
      "hargaBeli": 5000,
      "hargaJual": 7000,
      "gambar": "assets/img/kopi.jpg"
    }
  ],
  "transaksi": [
    {
      "id": 1,
      "tanggal": "2026-11-16T10:00:00.000Z",
      "total": 24000,
      "pelanggan": {
        "nama": "Bu Marni",
        "telepon": "0812xxxxxxx",
        "alamat": "Jl. Contoh No. 1"
      },
      "items": [
        {
          "produkId": 1,
          "nama": "Kopi",
          "hargaJual": 7000,
          "jumlah": 2,
          "subtotal": 14000
        }
      ]
    }
  ],
  "cabang": [
    {
      "id": 1,
      "nama": "Cabang Pusat",
      "alamat": "Jl. Contoh No. 1",
      "jamOperasional": "08.00-21.00",
      "lat": -6.2,
      "lng": 106.8
    }
  ]
}
```

Endpoint:

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/produk` | daftar produk |
| GET | `/produk/:id` | detail produk |
| POST | `/produk` | tambah produk |
| PUT/PATCH | `/produk/:id` | edit produk |
| DELETE | `/produk/:id` | hapus produk |
| GET | `/transaksi` | riwayat transaksi |
| GET | `/transaksi/:id` | **nested JSON**: `items[]` + `pelanggan{}` |
| POST | `/transaksi` | simpan transaksi |
| GET | `/cabang` | data cabang untuk peta |

Model baru (A):

```ts
export interface Pelanggan {
  nama: string;
  telepon?: string;
  alamat?: string;
}

export interface TransaksiItem {
  produkId: number;
  nama: string;
  hargaJual: number;
  jumlah: number;
  subtotal: number;
}

export interface Transaksi {
  id: number;
  tanggal: string;
  total: number;
  pelanggan: Pelanggan;
  items: TransaksiItem[];
}

export interface Cabang {
  id: number;
  nama: string;
  alamat: string;
  jamOperasional: string;
  lat: number;
  lng: number;
}
```

---

## Urutan Kerja

### Sprint 0 — Fondasi (A, wajib selesai dulu)

- [ ] `db.json` + `db.seed.json` + script `api`, `api:reset`
- [ ] `environment.ts` berisi `apiUrl`
- [ ] model baru + `ApiService` + 2 interceptor
- [ ] `ProdukService` & `TransaksiService` versi HTTP
- [ ] `npm run api` + `ionic serve` + `ng build` hijau
- [ ] commit + push, kabari grup

Gate: B/C/D baru mulai setelah bisa lihat produk dari server.

### Sprint 1 — Paralel

- [ ] B: produk list (loading/error) → form CRUD ke API → kamera + izin ditolak
- [ ] C: PWA + icon → splash → offline fallback → `PreferenceService` → peta dashboard
- [ ] D: keranjang persist → IndexedDB → auto-sync → riwayat/detail nested

### Sprint 2 — Integrasi & Uji Offline

- [ ] Uji server mati, airplane mode, DevTools offline
- [ ] Uji izin kamera ditolak
- [ ] Uji install PWA + clear IndexedDB
- [ ] Rapikan semua state loading/error yang belum konsisten
- [ ] Test di emulator/HP (base URL `10.0.2.2` atau IP LAN)

### Sprint 3 — README, Demo, Commit

- [ ] README final: fitur UAS, cara run backend, endpoint, screenshot
- [ ] Latihan demo ±10 menit
- [ ] Tiap orang hafal file & alasan teknis bagiannya
- [ ] Commit history rapi, `main` bersih

---

## Skrip Demo ±10 Menit

1. (0:30) Buka app → splash → dashboard data dari API. **(C)**
2. (1:30) Produk: loading → tambah produk + foto kamera. **(B)**
3. (1:00) Tolak izin kamera → pesan ramah. **(B)**
4. (1:00) Edit & hapus produk, buktikan data berubah di server. **(B/A)**
5. (1:00) Keranjang → tutup app → buka lagi isi tetap → checkout. **(D)**
6. (1:00) Detail transaksi nested (`items` + `pelanggan`). **(D/A)**
7. (1:30) Peta di dashboard → klik 2 marker. **(C)**
8. (1:30) Matikan json-server → error jelas → produk terakhir tetap tampil →
   nyalakan → sync otomatis. **(D)**
9. (1:00) Install PWA + fallback offline. **(C)**
10. (0:30) Tema gelap persist setelah restart. **(C)**

---

## Risiko & Antisipasi

- `ng add @angular/pwa` di Angular 22 bisa beda output → siap skenario manual.
- Kamera di browser butuh `localhost`/HTTPS; `Camera` web memakai file input,
  jadi "izin ditolak" disimulasikan lewat setting situs browser.
- Leaflet sering abu-abu → wajib `invalidateSize()` setelah view masuk.
- Emulator Android tidak bisa `localhost:3000` → pakai `10.0.2.2`.
- Base64 membuat `db.json` membengkak → kompres foto, sediakan `api:reset`.
- "Offline total" tidak mungkin untuk kunjungan pertama → framing: app tetap hidup
  setelah pernah dibuka/di-install.
- Nilai individu 50% → jangan cuma tahu bagian sendiri, minimal paham alur data
  dari backend → service → halaman.

---

## Checklist README (tambahan UAS)

- [ ] Daftar fitur UAS (8 poin) + fitur UTS
- [ ] Cara install dependency
- [ ] Cara jalankan backend: `npm run api`, port, isi `db.json`
- [ ] Cara jalankan app: `ionic serve`
- [ ] Daftar endpoint + contoh response nested JSON
- [ ] Catatan kredensial (tidak ada / jelaskan)
- [ ] Cara reset data demo (`npm run api:reset`)
- [ ] Catatan offline & PWA (cara install, cara tes offline)
- [ ] Catatan base URL untuk emulator/HP
