import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;

  constructor(public auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
