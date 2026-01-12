import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {
    usuario: Usuario = {
        nombre: '',
        email: '',
        password: '',
        rol: 'miembro',
        estado: 'activo'
    };
    loading: boolean = false;
    error: string = '';

    // Para confirmar contraseña
    confirmPasswordVal: string = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    onSubmit(): void {
        this.error = '';

        if (this.usuario.password !== this.confirmPasswordVal) {
            this.error = 'Las contraseñas no coinciden.';
            return;
        }

        this.loading = true;
        this.authService.register(this.usuario).subscribe({
            next: (createdUser) => {
                this.loading = false;
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
                this.error = 'Error al registrar usuario. Intenta nuevamente.';
            }
        });
    }
}
