import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
    email = '';
    password = '';
    loading = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Por favor completa todos los campos';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (user) => {
                this.loading = false;
                this.router.navigate(['/libros']); // Redirigir al inicio o dashboard
            },
            error: (err) => {
                this.loading = false;
                // Manejar error backend (401, 500, etc)
                if (err.status === 401) {
                    this.errorMessage = 'Credenciales incorrectas';
                } else {
                    this.errorMessage = 'Error en el servidor. Intenta más tarde';
                }
            }
        });
    }
}
