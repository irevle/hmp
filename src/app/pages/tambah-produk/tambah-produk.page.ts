import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-tambah-produk',
  templateUrl: './tambah-produk.page.html',
  styleUrls: ['./tambah-produk.page.scss'],
  standalone: false,
})
export class TambahProdukPage implements OnInit {
  produkForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private produkService: ProdukService,
    private router: Router
  ) { }

  ngOnInit() {
    this.produkForm = this.fb.group({
      nama: ['', [Validators.required]],
      kategori: ['', [Validators.required]],
      hargaBeli: [null, [Validators.required, Validators.min(1)]],
      hargaJual: [null, [Validators.required, Validators.min(1)]],
      stok: [null, [Validators.required, Validators.min(0)]],
      gambar: ['']
    });
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.produkForm.invalid) {
      return;
    }

    // Auto generate ID baru berdasarkan jumlah produk
    const totalProduk = this.produkService.getJumlahProduk();
    const formValues = this.produkForm.value;
    const produkBaru: Produk = {
      ...this.produkForm.value,
      id: totalProduk + 1,
      gambar: formValues.gambar && formValues.gambar.trim() !== ''
        ? formValues.gambar
        : 'https://placehold.co/300x200?text=No+Image'
    };

    // Panggil method tambah() yang ada di ProdukService
    this.produkService.tambah(produkBaru);

    // Navigasi kembali ke halaman produk
    this.router.navigate(['/tabs/produk']);
  }
}
