import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationConfig } from '../models/core/notification-config.model';

@Component({
  selector: 'lib-notification-message',
  imports: [],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMessageComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationConfig
  ) {
  }
}
