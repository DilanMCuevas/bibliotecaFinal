import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Resena } from '../../../core/domain/resena';
import { ResenaService } from '../resena.service';

@Component({
  selector: 'app-resena-list',
  standalone: false,
  templateUrl: './resena-list.component.html',
  styleUrls: ['./resena-list.component.css']
})
export class ResenaListComponent implements OnInit {
  resenas: Resena[] = [];
  resenasFiltradas: Resena[] = [];
  searchTerm: string = '';
  loading = true;
  error = false;

  constructor(
    private resenaService: ResenaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarResenas();
  }

  cargarResenas(): void {
    this.loading = true;
    this.error = false;
    this.resenaService.findAll().subscribe({
      next: (data) => {
        this.resenas = data;
        this.resenasFiltradas = data;
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

  filtrarResenas(): void {
    if (!this.searchTerm) {
      this.resenasFiltradas = this.resenas;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.resenasFiltradas = this.resenas.filter(r =>
        r.comentario.toLowerCase().includes(term) ||
        r.libroId.toString().includes(term)
      );
    }
  }

  eliminar(id: number): void {
      if(confirm('¿Eliminar esta reseña?')) {
          this.resenaService.delete(id).subscribe({
              next: () => {
                   this.resenas = this.resenas.filter(r => r.id !== id);
                   this.filtrarResenas();
                   this.cdr.detectChanges();
                   alert('Reseña eliminada.');
              },
              error: (err) => {
                  console.error(err);
                  alert('Error al eliminar reseña.');
              }
          });
      }
  }
}
