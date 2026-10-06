import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const gelap = localStorage.getItem('simobile-dark') === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', gelap);
  }
}