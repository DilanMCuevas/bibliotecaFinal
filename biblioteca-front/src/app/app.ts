import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { Usuario } from './core/domain/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  usuario: Usuario | null = null;
  protected readonly title = signal('biblioteca-front');

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.currentUser.subscribe(user => {
          this.usuario = user;
      });
  }

  logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
  }
}
