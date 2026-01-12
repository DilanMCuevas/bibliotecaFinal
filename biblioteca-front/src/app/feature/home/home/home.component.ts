import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: Usuario | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }

  get welcomeMessage(): string {
    if (this.currentUser) {
      return `¡Bienvenido de nuevo, ${this.currentUser.nombre}!`;
    }
    return 'Bienvenido a la Biblioteca ESCOM';
  }
}
