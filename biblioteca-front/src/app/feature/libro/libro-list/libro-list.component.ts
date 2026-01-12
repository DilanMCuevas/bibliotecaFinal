import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LibroService } from '../libro.service';
import { Libro } from '../../../core/domain/libro';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-libro-list',
  standalone: false,
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit {

  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  terminoBusqueda: string = '';
  loading: boolean = true;
  error: boolean = false;
  isAdmin: boolean = false;

  constructor(
      private libroService: LibroService,
      private authService: AuthService,
      private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.rol === 'admin';
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.loading = true;
    this.error = false;
    this.libroService.findAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.librosFiltrados = data;
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

  filtrarLibros(): void {
    if (!this.terminoBusqueda) {
      this.librosFiltrados = this.libros;
    } else {
      const termino = this.terminoBusqueda.toLowerCase();
      this.librosFiltrados = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(termino) ||
        libro.editorial.toLowerCase().includes(termino) ||
        libro.anio.toString().includes(termino)
      );
    }
  }

  eliminar(id: number): void {
      if(confirm('¿Está seguro de eliminar este libro?')) {
          this.libroService.delete(id).subscribe({
              next: () => {
                  this.libros = this.libros.filter(l => l.id !== id);
                  this.filtrarLibros();
                  this.cd.detectChanges();
              },
              error: (err) => {
                  console.error(err);
                  alert('Error al eliminar el libro. Verifique que no tenga préstamos activos.');
              }
          });
      }
  }
}
