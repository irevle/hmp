import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  standalone: false,
})
export class CustomHeaderComponent {
  @Input() title = '';
  @Input() showMenuButton = true;
  @Input() showBackButton = false;
  @Input() defaultBackHref = '/tabs/dashboard';
}
