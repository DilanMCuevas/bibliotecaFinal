import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: false,
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent {

  usuario: Usuario = {
      nombre: '',
      email: '',
      password: '',
      rol: 'miembro', // Default
      estado: 'activo'
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  guardar(): void {
      this.usuarioService.save(this.usuario).subscribe({
          next: () => {
              this.router.navigate(['/usuarios']);
          },
          error: (e) => {
              console.error(e);
              alert('Error al guardar usuario');
          }
      });
  }
}
