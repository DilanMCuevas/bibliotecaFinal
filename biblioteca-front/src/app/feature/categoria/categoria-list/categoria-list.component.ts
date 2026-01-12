import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../../../core/domain/categoria';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-categoria-list',
  standalone: false,
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = []; // Para filtrado local
  loading = true;
  error = '';
  isAdmin = false;
  filtro = ''; // Termino de busqueda

  constructor(
      private categoriaService: CategoriaService,
      private authService: AuthService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.rol === 'admin';
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.loading = true;
    this.categoriaService.findAll().subscribe({
      next: (data) => {
        this.categorias = data;
        this.categoriasFiltradas = data; // Inicializar filtrados
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.error = 'Error al cargar categorías';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrar(): void {
      const termino = this.filtro.toLowerCase();
      this.categoriasFiltradas = this.categorias.filter(c =>
          c.nombre.toLowerCase().includes(termino) ||
          (c.descripcion && c.descripcion.toLowerCase().includes(termino))
      );
  }

  eliminar(id: number) {
      if(confirm('¿Estás seguro de eliminar esta categoría?')) {
          this.categoriaService.delete(id).subscribe({
              next: () => {
                  this.cargarCategorias();
              },
              error: (err) => {
                  console.error(err);
                  alert('Error al eliminar categoría. Verifique que no tenga libros asociados.');
              }
          });
      }
  }
}
