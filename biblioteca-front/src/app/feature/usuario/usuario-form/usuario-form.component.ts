import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: false,
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario = {
      nombre: '',
      email: '',
      password: '',
      rol: 'miembro', // Default
      estado: 'activo'
  };
  isEditMode = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
          this.isEditMode = true;
          this.usuarioService.findById(+id).subscribe(data => {
              this.usuario = data;
              // Para edición no requerimos password obligatorio si no se cambia
              // (Manejo simple por ahora, backend debe ignorar si viene vacio en update o requerir logica adicional)
          });
      }
  }

  guardar(): void {
      if (this.isEditMode && this.usuario.id) {
          this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
              next: () => this.router.navigate(['/usuarios']),
              error: (e) => alert('Error al actualizar usuario')
          });
      } else {
          this.usuarioService.save(this.usuario).subscribe({
              next: () => {
                  alert('Usuario creado exitosamente. Se ha enviado un correo de bienvenida.');
                  this.router.navigate(['/usuarios']);
              },
              error: (e) => {
                  console.error(e);
                  alert('Error al guardar usuario');
              }
          });
      }
  }
}
