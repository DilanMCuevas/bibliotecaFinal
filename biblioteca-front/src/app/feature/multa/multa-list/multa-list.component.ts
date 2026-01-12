import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Multa } from '../../../core/domain/multa';
import { MultaService } from '../multa.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-multa-list',
  standalone: false,
  templateUrl: './multa-list.component.html',
  styleUrls: ['./multa-list.component.css']
})
export class MultaListComponent implements OnInit {
  multas: Multa[] = [];
  multasFiltradas: Multa[] = [];
  searchTerm: string = '';
  loading = true;
  error = false;
  isAdmin = false;

  constructor(
    private multaService: MultaService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.isAdmin = user?.rol === 'admin';
    this.cargarMultas();
  }

  cargarMultas(): void {
    this.loading = true;
    this.error = false;
    this.multaService.findAll().subscribe({
      next: (data) => {
        this.multas = data;
        this.multasFiltradas = data;
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

  pagar(id: number): void {
      if(confirm('¿Confirmar pago de multa?')) {
          this.multaService.pagar(id).subscribe({
              next: () => {
                  alert('Pago registrado correctamente.');
                  this.cargarMultas();
              },
              error: (err) => {
                  console.error(err);
                  const msg = err.error?.message || err.message || 'Error desconocido';
                  alert('Error al procesar pago: ' + msg);
              }
          });
      }
  }

  eliminar(id: number): void {
      if(confirm('¿Eliminar esta multa?')) {
          this.multaService.delete(id).subscribe({
              next: () => {
                   alert('Multa eliminada correctamente.');
                   this.cargarMultas();
              },
              error: (err) => {
                  console.error(err);
                  const msg = err.error?.message || err.message || 'Error desconocido';
                  alert('Error al eliminar multa: ' + msg);
              }
          });
      }
  }

  filtrarMultas(): void {
    if (!this.searchTerm) {
      this.multasFiltradas = this.multas;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.multasFiltradas = this.multas.filter(m =>
        m.motivo.toLowerCase().includes(term) ||
        m.estado.toLowerCase().includes(term)
      );
    }
  }
}
