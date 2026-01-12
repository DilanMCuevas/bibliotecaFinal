import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../core/domain/usuario'; // Verifica ruta relativa

@Component({
  selector: 'app-usuario-list',
  standalone: false,
  templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => this.usuarios = data,
      error: (e) => console.error(e)
    });
  }

  eliminar(id: number): void {
      if(confirm('¿Estás seguro de eliminar este usuario?')) {
          this.usuarioService.delete(id).subscribe(() => this.cargarUsuarios());
      }
  }
}
