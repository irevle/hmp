import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    const gelap = localStorage.getItem('simobile-dark') === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', gelap);
  }
  async logout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Keluar?',
      message: 'Yakin ingin keluar dari SIMOBILE?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Keluar',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
}
