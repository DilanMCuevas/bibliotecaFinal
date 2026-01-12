import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ejemplar } from '../../../core/domain/ejemplar';
import { EjemplarService } from '../ejemplar.service';
import { LibroService } from '../../libro/libro.service';
import { Libro } from '../../../core/domain/libro';

@Component({
  selector: 'app-ejemplar-list',
  standalone: false,
  templateUrl: './ejemplar-list.component.html',
  styleUrls: ['./ejemplar-list.component.css']
})
export class EjemplarListComponent implements OnInit {
  ejemplares: Ejemplar[] = [];
  ejemplaresFiltrados: Ejemplar[] = [];
  searchTerm: string = '';
  librosMap: Map<number, string> = new Map();
  loading = true;
  error = false;

  constructor(
    private ejemplarService: EjemplarService,
    private libroService: LibroService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.error = false;

    // Cargar libros primero para mapear nombres
    this.libroService.findAll().subscribe({
        next: (libros) => {
            libros.forEach(l => this.librosMap.set(l.id, l.titulo));
            this.cargarEjemplares();
        },
        error: (err) => {
            console.error('Error cargando libros', err);
            this.error = true;
            this.loading = false;
            this.cdr.detectChanges();
        }
    });
  }

  cargarEjemplares(): void {
    this.ejemplarService.getEjemplares().subscribe({
      next: (data) => {
        this.ejemplares = data;
        this.ejemplaresFiltrados = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando ejemplares', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este ejemplar?')) {
      this.ejemplarService.deleteEjemplar(id).subscribe({
        next: () => {
          this.ejemplares = this.ejemplares.filter(e => e.id !== id);
          this.filtrarEjemplares();
          this.cdr.detectChanges();
        },
        error: (err) => {
            console.error('Error eliminando ejemplar', err);
            alert('Error al eliminar el ejemplar');
        }
      });
    }
  }

  getNombreLibro(id: number): string {
      return this.librosMap.get(id) || 'Desconocido';
  }

  filtrarEjemplares(): void {
    if (!this.searchTerm) {
      this.ejemplaresFiltrados = this.ejemplares;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.ejemplaresFiltrados = this.ejemplares.filter(e => {
        const libro = this.getNombreLibro(e.libroId).toLowerCase();
        const ubicacion = e.ubicacion.toLowerCase();
        const estado = e.estado.toLowerCase();
        return libro.includes(term) || ubicacion.includes(term) || estado.includes(term);
      });
    }
  }
}
