// notification.component.ts
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnChanges {
  @Input() message: string = '';
  show: boolean = false;

  ngOnChanges() {
    if (this.message) {
      this.show = true;
      setTimeout(() => this.show = false, 3000); // Ocultar después de 3 segundos
    }
  }
}
