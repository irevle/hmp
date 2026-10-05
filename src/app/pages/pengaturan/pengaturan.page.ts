import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {
  darkMode = false;

  constructor() { }

  ngOnInit() {
    this.darkMode = localStorage.getItem('simobile-dark') === 'true';
    this.terapkanMode();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('simobile-dark', String(this.darkMode));
    this.terapkanMode();
  }

  private terapkanMode(): void {
    document.body.classList.toggle('dark', this.darkMode);
  }
}