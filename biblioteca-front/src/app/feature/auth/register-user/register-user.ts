import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css']
})
export class RegisterUser {
    // Inicializamos como objeto plano ya que Usuario es una interfaz
    usuario: Usuario = {
        nombre: '',
        email: '',
        password: '',
        rol: 'miembro',
        estado: 'activo'
    };
    loading = false;
    errorMessage = '';

    constructor(private usuarioService: UsuarioService, private router: Router) {}

    onSubmit() {
        if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
            this.errorMessage = 'Todos los campos son obligatorios';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.usuarioService.save(this.usuario).subscribe({
            next: (createdUser) => {
                this.loading = false;
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
                this.errorMessage = 'Hubo un error al registrar. Intenta de nuevo.';
            }
        });
    }
}
