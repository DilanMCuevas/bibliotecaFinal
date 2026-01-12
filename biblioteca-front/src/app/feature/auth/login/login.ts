import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    email: string = '';
    passwordVal: string = ''; // Usamos passwordVal para evitar conflictos con palabras reservadas si las hubiera
    loading: boolean = false;
    error: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        this.loading = true;
        this.error = '';

        const credentials = {
            email: this.email,
            password: this.passwordVal
        };

        this.authService.login(credentials).subscribe({
            next: (user) => {
                this.loading = false;
                // Redirigir al dashboard o home
                this.router.navigate(['/libros']);
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
                if (err.status === 401) {
                    this.error = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
                } else {
                    this.error = 'Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.';
                }
            }
        });
    }
}
