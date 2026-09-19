import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-edit-produk',
  templateUrl: './edit-produk.page.html',
  styleUrls: ['./edit-produk.page.scss'],
  standalone: false,
})
export class EditProdukPage implements OnInit {
  produkForm!: FormGroup;
  isSubmitted = false;
  produkId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private produkService: ProdukService,
    private router: Router
  ) { }

  ngOnInit() {
    // Ambil ID dari URL parameter
    this.produkId = Number(this.route.snapshot.paramMap.get('id'));

    // Inisialisasi Form
    this.produkForm = this.fb.group({
      id: [this.produkId],
      nama: ['', [Validators.required]],
      kategori: ['', [Validators.required]],
      hargaBeli: [null, [Validators.required, Validators.min(1)]],
      hargaJual: [null, [Validators.required, Validators.min(1)]],
      stok: [null, [Validators.required, Validators.min(0)]],
      gambar: ['']
    });

    // Ambil data produk lama memakai getById()
    const produkLama = this.produkService.getById(this.produkId);
    if (produkLama) {
      this.produkForm.patchValue(produkLama);
    }
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.produkForm.invalid) {
      return;
    }

    const dataBaru: Produk = this.produkForm.value;

    // Memanggil method update() yang ada di ProdukService
    const berhasil = this.produkService.update(this.produkId, dataBaru);

    if (berhasil) {
      this.router.navigate(['/tabs/produk']);
    }
  }
}
