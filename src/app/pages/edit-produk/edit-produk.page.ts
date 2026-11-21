import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdukService } from '../../services/produk.service';
import { Produk } from '../../models/produk.model';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { FormProdukService } from '../produk/form-produk.service';

@Component({
  selector: 'app-edit-produk',
  templateUrl: './edit-produk.page.html',
  styleUrls: ['./edit-produk.page.scss'],
  providers: [FormProdukService],
  standalone: false,
})
export class EditProdukPage implements OnInit {
  produkForm!: FormGroup;
  isSubmitted = false;
  private produkLama?: Produk;
   private bacaan?: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private produkService: ProdukService,
    public editor: FormProdukService,
    private api: ApiService,
  ) { }

  ngOnInit() {

   

    // Inisialisasi Form
    this.produkForm = this.fb.group({
      nama: ['', [Validators.required]],
      kategori: ['', [Validators.required]],
      hargaBeli: [null, [Validators.required, Validators.min(1)]],
      hargaJual: [null, [Validators.required, Validators.min(1)]],
      stok: [null, [Validators.required, Validators.min(0)]],
      gambar: ['']
    });

    this.editor.status$.next('memuat');
  
  }
  ionViewDidEnter() {
  this.bacaan?.unsubscribe();
  this.produkLama = undefined;
  this.isSubmitted = false;
  this.produkForm.enable();
  this.editor.pesan = '';
  this.editor.status$.next('memuat');

  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    this.editor.pesan = 'ID produk tidak ditemukan.';
    this.editor.status$.next('gagal');
    return;
  }

  this.bacaan = this.api.get<Produk>('/produk/' + encodeURIComponent(id)).subscribe({
    next: produk => {
      this.produkLama = produk;
      this.produkForm.reset(produk);
      this.editor.status$.next('siap');
    },
    error: err => {
      this.editor.pesan = err.status === 404
        ? 'Produk tidak ditemukan.'
        : 'Gagal memuat produk.';
      this.editor.status$.next('gagal');
    },
  });
}
  onSubmit() {
   this.isSubmitted = true;
  const data = this.editor.baca(this.produkForm);
  if (!data || !this.produkLama) return;

  const produk = { ...this.produkLama, ...data };
  const request = this.produkService.update(produk.id, produk);
  this.editor.simpan(this.produkForm, request, 'Produk diperbarui.');
  }
}
