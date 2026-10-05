import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produk } from '../../models/produk.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent {
  @Input() produk!: Produk;
  @Output() cardClick = new EventEmitter<number>();

  get gambar(): string {
    return this.produk?.gambar && this.produk.gambar.trim() !== ''
      ? this.produk.gambar
      : 'assets/img/no-image.png';
  }

  onCardClick(): void {
    this.cardClick.emit(this.produk.id);
  }
}