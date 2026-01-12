import { Component, signal, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from './core/domain/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('biblioteca-front');
  currentUser: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
