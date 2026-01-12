import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AutorService } from '../autor.service';
import { Autor } from '../../../core/domain/autor';

@Component({
  selector: 'app-autor-list',
  standalone: false,
  templateUrl: './autor-list.component.html'
})
export class AutorListComponent implements OnInit {

  autores: Autor[] = [];
  searchTerm = '';
  autoresFiltrados: Autor[] = [];
  loading = true;
  error = false;

  constructor(
    private autorService: AutorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.loading = true;
    this.error = false;
    this.autorService.findAll().subscribe({
        next: (data) => {
            this.autores = data;
            this.autoresFiltrados = data;
            this.loading = false;
            this.cdr.detectChanges();
        },
        error: (err) => {
            console.error(err);
            this.error = true;
            this.loading = false;
            this.cdr.detectChanges();
        }
    });
  }

  filtrarAutores(): void {
      if (!this.searchTerm) {
          this.autoresFiltrados = this.autores;
      } else {
          const term = this.searchTerm.toLowerCase();
          this.autoresFiltrados = this.autores.filter(a =>
              a.nombre.toLowerCase().includes(term) ||
              (a.bio && a.bio.toLowerCase().includes(term))
          );
      }
  }

  eliminar(id: number): void {
      if(confirm('¿Seguro que deseas eliminar este autor?')) {
          this.autorService.delete(id).subscribe({
              next: () => {
                  this.autores = this.autores.filter(a => a.id !== id);
                  this.filtrarAutores();
                  this.cdr.detectChanges();
              },
              error: (err) => alert('Error al eliminar autor')
          })
      }
  }
}
