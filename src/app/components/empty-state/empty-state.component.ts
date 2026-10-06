import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon = 'cube-outline';
  @Input() pesan = 'Data kosong';
  @Input() aksiLabel = '';
  @Output() aksi = new EventEmitter<void>();

  onAksi(): void {
    this.aksi.emit();
  }
}
