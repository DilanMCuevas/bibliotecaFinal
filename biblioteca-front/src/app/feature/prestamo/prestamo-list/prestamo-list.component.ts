import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../../../core/domain/prestamo';
import { UsuarioService } from '../../usuario/usuario.service';
import { LibroService } from '../../libro/libro.service';
import { EjemplarService } from '../../ejemplar/ejemplar.service'; // Importar EjemplarService
import { Usuario } from '../../../core/domain/usuario';
import { Libro } from '../../../core/domain/libro';
import { Ejemplar } from '../../../core/domain/ejemplar';

@Component({
  selector: 'app-prestamo-list',
  standalone: false,
  templateUrl: './prestamo-list.component.html'
})
export class PrestamoListComponent implements OnInit {
    prestamos: Prestamo[] = [];
    prestamosFiltrados: Prestamo[] = [];
    searchTerm: string = '';

    usuarioMap = new Map<number, string>();
    // Mapas para resolver libro desde ejemplar
    ejemplarLibroMap = new Map<number, number>(); // ejemplarId -> libroId
    libroTituloMap = new Map<number, string>();   // libroId -> titulo

    loading: boolean = true;
    error: boolean = false;

    constructor(
        private prestamoService: PrestamoService,
        private usuarioService: UsuarioService,
        private libroService: LibroService,
        private ejemplarService: EjemplarService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cargarPrestamos();
    }

    cargarPrestamos(): void {
        this.loading = true;
        this.error = false;

        // Usamos forkJoin idealmente, pero por simplicidad haremos suscripciones anidadas o paralelas
        // Cargamos catálogos necesarios
        this.usuarioService.findAll().subscribe(usuarios => {
            usuarios.forEach(u => this.usuarioMap.set(u.id!, u.nombre));
        });

        this.ejemplarService.getEjemplares().subscribe(ejemplares => {
            ejemplares.forEach(e => this.ejemplarLibroMap.set(e.id!, e.libroId));
        });

        this.libroService.findAll().subscribe(libros => {
            libros.forEach(l => this.libroTituloMap.set(l.id!, l.titulo));
        });

        this.prestamoService.findAll().subscribe({
            next: (data) => {
                this.prestamos = data;
                this.prestamosFiltrados = data;
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

    getTituloLibro(ejemplarId: number): string {
        const libroId = this.ejemplarLibroMap.get(ejemplarId);
        if (libroId) {
            return this.libroTituloMap.get(libroId) || 'Libro desconocido';
        }
        return 'Ejemplar ' + ejemplarId;
    }

    filtrarPrestamos(): void {
        if (!this.searchTerm) {
            this.prestamosFiltrados = this.prestamos;
        } else {
            const term = this.searchTerm.toLowerCase();
            this.prestamosFiltrados = this.prestamos.filter(p => {
                const usuario = this.usuarioMap.get(p.usuarioId)?.toLowerCase() || '';
                const libro = this.getTituloLibro(p.ejemplarId).toLowerCase();
                return usuario.includes(term) || libro.includes(term);
            });
        }
    }

  devolver(id: number): void {
      if(confirm('¿Confirmar devolución?')) {
          this.prestamoService.devolver(id).subscribe({
            next: () => {
                alert('Devolución registrada correctamente.');
                this.cargarPrestamos();
            },
            error: (err) => {
                console.error(err);
                const msg = err.error?.message || err.message || 'Error desconocido';
                alert('Error al procesar la devolución: ' + msg);
            }
          });
      }
  }

  renovar(id: number): void {
      if(confirm('¿Confirmar renovación?')) {
          this.prestamoService.renovar(id).subscribe({
            next: (prestamoRenovado) => {
                alert(`Préstamo renovado exitosamente. Nueva fecha de vencimiento: ${prestamoRenovado.fechaVencimiento}`);
                this.cargarPrestamos();
            },
            error: (err) => {
                console.error(err);
                const msg = err.error?.message || err.message || 'Error desconocido';
                alert('Error al renovar el préstamo: ' + msg);
            }
          });
      }
  }

  esVencido(p: Prestamo): boolean {
    if (p.estado !== 'activo') return false;
    const vencimiento = new Date(p.fechaVencimiento);
    const ahora = new Date();
    return vencimiento < ahora;
  }
}
