import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Reserva } from '../../../core/domain/reserva';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva-list',
  standalone: false,
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservaListComponent implements OnInit {
  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];
  searchTerm: string = '';
  loading = true;
  error = false;

  constructor(
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.loading = true;
    this.error = false;
    this.reservaService.findAll().subscribe({
      next: (data) => {
        this.reservas = data;
        this.reservasFiltradas = data;
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

  filtrarReservas(): void {
    if (!this.searchTerm) {
      this.reservasFiltradas = this.reservas;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.reservasFiltradas = this.reservas.filter(r =>
        r.estado.toLowerCase().includes(term) ||
        r.id.toString().includes(term)
      );
    }
  }

  cancelar(id: number): void {
      if(confirm('¿Cancelar esta reserva?')) {
          this.reservaService.cancel(id).subscribe({
              next: () => {
                  alert('Reserva cancelada.');
                  this.cargarReservas();
              },
              error: (err) => {
                  console.error(err);
                  alert('Error al cancelar la reserva.');
              }
          });
      }
  }

  eliminar(id: number): void {
      if(confirm('¿Eliminar permanentemente esta reserva?')) {
          this.reservaService.delete(id).subscribe({
              next: () => this.cargarReservas(),
              error: () => alert('Error al eliminar')
          });
      }
  }
}
