import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdukService } from '../../services/produk.service';
import { FormProdukService } from '../produk/form-produk.service';

@Component({
  selector: 'app-tambah-produk',
  templateUrl: './tambah-produk.page.html',
  styleUrls: ['./tambah-produk.page.scss'],
  providers: [FormProdukService],
  standalone: false,
})
export class TambahProdukPage implements OnInit {
  produkForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private produkService: ProdukService,
    public editor: FormProdukService,
  ) {}

  ngOnInit() {
    this.produkForm = this.fb.group({
      nama: ['', [Validators.required]],
      kategori: ['', [Validators.required]],
      hargaBeli: [null, [Validators.required, Validators.min(1)]],
      hargaJual: [null, [Validators.required, Validators.min(1)]],
      stok: [null, [Validators.required, Validators.min(0)]],
      gambar: [''],
    });
  }
  ionViewDidEnter() {
  this.produkForm.enable();
  this.produkForm.reset({ nama: '', kategori: '', gambar: '' });
  this.isSubmitted = false;
  this.editor.pesan = '';
  this.editor.status$.next('siap');
}
  onSubmit() {
    this.isSubmitted = true;
    const data = this.editor.baca(this.produkForm);
  if (!data) return;

  const request = this.produkService.tambah(data);
  this.editor.simpan(this.produkForm, request, 'Produk ditambahkan.');

  }
}
