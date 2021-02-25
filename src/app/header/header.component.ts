import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notifications: Array<any> = [{body: 'notification body 1'}, {body: 'notification body 2'}];
  notificationListExpanded = true;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  dispatchNotification(notification: any, accepted: boolean) {
    if (accepted) {
      this.notifications.splice(this.notifications.indexOf(notification), 1);
      this.router.navigate(['/inbox']);
    } else {
      this.notifications.splice(this.notifications.indexOf(notification), 1);
    }

  }

  showNotifications() {
    this.notificationListExpanded = !this.notificationListExpanded;
  }
}
