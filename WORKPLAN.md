# Rencana Kerja — Project SIMOBILE

## Status Awal

- Template Ionic Angular sudah jadi, git sudah ada.
- Halaman sudah dibuat tapi **masih kosong** (cuma kerangka): dashboard, produk, transaksi, profil (tabs) + detail-produk, tambah-produk, edit-produk, keranjang, riwayat-transaksi, detail-transaksi, pengaturan, tentang.
- Navigasi Tab (4 tab), menu geser samping (drawer), dan routing sudah terpasang.

## Yang BELUM Ada (Pekerjaan Kita)

- Folder `components/`, `services/`, `models/` (wajib sesuai soal).
- Semua halaman masih kosong (belum ada isi/logic).
- Data dummy produk (wajib minimal 10).
- Tema warna custom + mode gelap.
- Animasi.
- ⚠️ **Ada bug:** menu samping menunjuk ke `/tabs/keranjang`, `/tabs/riwayat-transaksi`, `/tabs/pengaturan`, `/tabs/tentang`, padahal halaman itu alamatnya top-level (bukan `/tabs`). Juga ada **duplikasi route `tabs`** di `app-routing.module.ts`.

---

## Pembagian Peran

### Anggota A — Fondasi + Lapisan Data

Mengerjakan:

- Folder `models/` → definisi struktur data:
  - `Produk` (id, nama, kategori, stok, hargaBeli, hargaJual, gambar)
  - `KeranjangItem` (produk, jumlah)
  - `Transaksi` (id, items, total, tanggal)
- Folder `services/`:
  - `ProdukService` — isi 10+ data dummy produk (variasi harga, stok, kategori; wajib ada yang stok 0 dan tanpa gambar buat ngetes fitur)
  - Fungsi: ambil semua, ambil by id, cari nama, produk terlaris, statistik dashboard
  - `KeranjangService` — ambil items, tambah, hapus, ubah jumlah, kosongkan, hitung total
  - `TransaksiService` — simpan transaksi, ambil semua, ambil by id
- Perbaiki bug route: hapus duplikasi route `tabs` di `app-routing.module.ts`, pindahkan keranjang/riwayat-transaksi/detail-transaksi/pengaturan/tentang jadi children dari `tabs` (sesuai menu samping), update `tabs-routing.module.ts`.

Ketentuan soal: #5 (sebagian), #8, 10 dummy, struktur folder modular.

### Anggota B — Alur Produk & Detail

Mengerjakan:

- Halaman Produk (`produk.page`):
  - Tampilkan list produk pakai `*ngFor`.
  - Pencarian real-time: `[(ngModel)]` di `ion-searchbar`, filter otomatis saat ketik (tanpa tombol cari).
  - Klik produk → navigasi ke detail (`detail-produk/:id`).
  - Render tiap item pakai `<app-product-card>` (dari C).
- Halaman Detail Produk (`detail-produk.page`):
  - Ambil id dari route param (`ActivatedRoute.params`).
  - Tampilkan nama, gambar, stok, harga beli, harga jual.
  - Property binding gambar: kalau gambar kosong → tampilkan gambar default.
  - Property binding tombol: `[disabled]="stok === 0"` di tombol "Tambah ke Keranjang".
  - Event binding: klik tombol → `KeranjangService.tambah(...)`.
- Halaman Tambah Produk (`tambah-produk.page`):
  - Reactive Form: nama (wajib), kategori (wajib), harga beli (> 0), harga jual (> 0), stok (≥ 0), gambar (opsional).
  - Pesan error inline per field yang salah. Submit gagal → jangan reset isian yang sudah benar.
  - Submit sukses → simpan via `ProdukService` → kembali ke daftar produk.
- Halaman Edit Produk (`edit-produk.page`):
  - Sama seperti form tambah, tapi diisi data produk yang sudah ada (ambil by id dari route).

Ketentuan soal: #3, #4, #6.

### Anggota C — Dashboard + Komponen + Tema + Animasi

Mengerjakan:

- Komponen reusable di `components/`:
  - `product-card/` (Input: data Produk → render kartu)
  - `empty-state/` (Input: icon + pesan → tampilkan saat list kosong)
  - `custom-header/` (Input: title → header standar)
- Halaman Dashboard (`dashboard.page`):
  - Tampilkan via interpolation binding: jumlah produk, total transaksi hari ini, produk terlaris.
  - Data dihitung dari service. Terlaris → pakai `<app-product-card>`; kosong → `<app-empty-state>`.
- Tema warna di `variables.scss`: ganti palet default Ionic (primary hijau toko, secondary kuning aksen, dll., lengkap dengan turunan rgb/contrast/shade).
- Mode gelap: toggle di halaman Pengaturan → `document.body.classList` add/remove class `dark` → simpan preferensi ke `localStorage` → load saat app dibuka (`app.component.ts`).
- Animasi (minimal 2):
  - Animasi 1: transisi halaman custom (`@angular/animations`).
  - Animasi 2: animasi item masuk keranjang (trigger `slideIn`, flag yang di-set saat item ditambahkan).

Ketentuan soal: #1 (bagian dashboard), #2, #7, #9, #10.

### Anggota D — Keranjang, Transaksi & Riwayat

Mengerjakan:

- Halaman Keranjang (`keranjang.page`):
  - Tampilkan daftar item: nama, harga satuan, jumlah, subtotal.
  - Tampilkan total belanja (dihitung dari service).
  - Tombol hapus per item, tombol +/- jumlah.
  - Tombol "Konfirmasi Transaksi": ambil semua item → hitung total → simpan via `TransaksiService` → kosongkan keranjang → pindah ke riwayat transaksi.
  - Kalau keranjang kosong: disable tombol + tampilkan `<app-empty-state>`.
- Halaman Riwayat Transaksi (`riwayat-transaksi.page`):
  - Daftar transaksi: tanggal, jumlah item, total.
  - Klik transaksi → navigasi ke detail (`detail-transaksi/:id`).
  - Kosong → `<app-empty-state>`.
- Halaman Detail Transaksi (`detail-transaksi.page`):
  - Ambil id dari route param → `TransaksiService.getById(id)`.
  - Tampilkan tanggal, daftar item + subtotal, total. Kasih back button di header.
- Halaman Profil (`profil.page`): konten statis (nama toko Toko Makmur Jaya, pemilik Bu Marni, info aplikasi) + styling rapi.

Ketentuan soal: #11, #12.

---

## Urutan Eksekusi

### Fase 0 — Kickoff (bareng-bareng, ±15 menit)

1. Baca file ini bareng-bareng.
2. Sepakat fix bug route (rekomendasi: pindahkan keranjang/riwayat/pengaturan/tentang jadi children `tabs`, kerjakan A).
3. A presentasikan kontrak `models/` + `services/` biar semua sepakat bentuk datanya.
4. C presentasikan komponen yang akan dibuat (nama selector + Input) biar B dan D tahu cara pakainya.
5. Sepakat palet warna (hijau-kuning sesuai request Bu Marni).

### Fase 1 — Fondasi (A kerja sendiri, B/C/D tunggu)

6. A: buat `models/` (`produk.model.ts`, `keranjang-item.model.ts`, `transaksi.model.ts`).
7. A: buat `services/` (`produk.service.ts` + 10+ dummy, `keranjang.service.ts`, `transaksi.service.ts`).
8. A: perbaiki bug route (duplikasi `tabs` + pindahkan halaman drawer ke children `tabs`).
9. A: commit & push, kabari B/C/D "services siap".
10. B/C/D sementara: pelajari file models A, belum coding.

### Fase 2 — Sprint Paralel (B, C, D kerja bareng)

11. **B**: pastikan `FormsModule` + `ReactiveFormsModule` ter-import di module yang butuh.
12. **B**: halaman Produk (list + search real-time pakai `ngModel` + navigasi ke detail).
13. **B**: halaman Detail Produk (route param by id + binding gambar default + disable tombol saat stok 0 + event tambah keranjang).
14. **B**: halaman Tambah Produk (Reactive Form + validasi + error inline, jangan reset isian yang benar).
15. **B**: halaman Edit Produk (form terisi data existing, update via service).
16. **B**: commit & push.
17. **C**: buat komponen `components/` (`product-card`, `empty-state`, `custom-header`).
18. **C**: halaman Dashboard (interpolation: jumlah produk, transaksi hari ini, terlaris).
19. **C**: tema warna custom di `variables.scss`.
20. **C**: mode gelap (toggle di Pengaturan + localStorage + load saat init).
21. **C**: 2 animasi (transisi halaman + item masuk keranjang).
22. **C**: commit & push.
23. **D**: halaman Keranjang (list + total + hapus/ubah jumlah + konfirmasi transaksi → riwayat; kosong → empty state).
24. **D**: halaman Riwayat Transaksi (list klik-able → detail by id).
25. **D**: halaman Detail Transaksi (route param + daftar item + total + back button).
26. **D**: halaman Profil (statis).
27. **D**: commit & push.

### Fase 3 — Integrasi & Polish (bareng-bareng)

28. B: pastikan tombol "Tambah ke Keranjang" di Detail Produk memanggil `KeranjangService` milik D.
29. C: pasang `<app-product-card>` di halaman B (produk list, dashboard terlaris) dan D (keranjang list) — kirim selector/Input-nya ke B dan D, atau B/D import module-nya.
30. A: review akhir — semua method service terpakai, struktur folder `pages/ components/ services/ models/` sesuai ketentuan.
31. Semua: test penuh end-to-end:
    - Buka app → Dashboard tampil ringkasan.
    - Cari produk real-time → klik detail → stok 0 tombol disable.
    - Tambah/edit produk (validasi form jalan).
    - Tambah ke keranjang → checkout → muncul di riwayat.
    - Mode gelap jalan, animasi jalan.
32. Update `README.md`: cara instalasi (`ionic serve`), daftar fitur yang jadi, screenshot (opsional). Commit & push.

---

## Kalau Mentok, Tanya Siapa

| Butuh... | Tanya |
|---|---|
| Bentuk data / method service | A |
| API komponen `product-card` | C |
| Format route/URL navigasi | A (routing) / C (UI) |
| Integrasi trigger animasi | C |
| Wiring toggle dark mode | C |
| Pola validasi form | B |
