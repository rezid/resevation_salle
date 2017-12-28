import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.authorized().subscribe(
      data => {
        console.log("xxxxxxxxxxxx");
        if (data.success) { this.isAuthenticated = true; }
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.isAuthenticated = true;
  }

  login() {
    this.isAuthenticated = true;
  }

}
