import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../../../core/domain/usuario'; // Verifica ruta relativa

@Component({
  selector: 'app-usuario-list',
  standalone: false,
  templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(private usuarioService: UsuarioService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = false;
    this.usuarioService.findAll().subscribe({
      next: (data) => {
          this.usuarios = data;
          this.usuariosFiltrados = data;
          this.loading = false;
          this.cd.detectChanges();
      },
      error: (e) => {
          console.error(e);
          this.loading = false;
          this.error = true;
          this.cd.detectChanges();
      }
    });
  }

  eliminar(id: number): void {
      if(confirm('¿Estás seguro de eliminar este usuario?')) {
          this.usuarioService.delete(id).subscribe(() => this.cargarUsuarios());
      }
  }

  filtrarUsuarios(): void {
    if (!this.searchTerm) {
      this.usuariosFiltrados = this.usuarios;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.usuariosFiltrados = this.usuarios.filter(u =>
        u.nombre.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    }
  }
}
