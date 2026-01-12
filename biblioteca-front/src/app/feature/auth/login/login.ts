import { Component, ChangeDetectorRef } from '@angular/core';
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

    constructor(
        private authService: AuthService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    onSubmit() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Por favor completa todos los campos';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        // Forzar detección de cambios para mostrar spinner inmediatamente si fuera necesario
        this.cdr.detectChanges();

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (user) => {
                this.loading = false;
                this.router.navigate(['/home']); // Redirigir al inicio o dashboard
            },
            error: (err) => {
                this.loading = false;
                // Manejar error backend (401, 500, etc)
                if (err.status === 401) {
                    this.errorMessage = 'Credenciales incorrectas';
                } else {
                    this.errorMessage = 'Error en el servidor. Intenta más tarde';
                }
                // Asegurar que Angular detecte el cambio de estado y habilite el botón nuevamente
                this.cdr.detectChanges();
            }
        });
    }
}
