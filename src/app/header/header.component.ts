import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  navigateToProfile() {
    this.router.navigateByUrl('/profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    });
  }
}
