import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { EventService } from '../../../core/services/event.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private eventService: EventService,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.eventService.authSubject.subscribe(obj => {
      this.isAuthenticated = obj.isAuth;
    });
  }

  logout() {
    this.auth.logout();
    this.eventService.logoutEvent();
  }
}
