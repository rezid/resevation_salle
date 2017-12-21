import { Component,Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-registred-form',
  templateUrl: './registred-form.component.html',
  styleUrls: ['./registred-form.component.css']
})
export class RegistredFormComponent implements OnInit {

  @Output() logoutEvent: EventEmitter<void>;

  constructor(
    private auth: AuthService
  ) {
    this.logoutEvent = new EventEmitter<void>();
   }

  ngOnInit() {
  }

  async logout() {
    await this.auth.logout();
    this.logoutEvent.emit();
  }

}
