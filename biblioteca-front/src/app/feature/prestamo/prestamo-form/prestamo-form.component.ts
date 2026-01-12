import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PrestamoService } from '../prestamo.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { LibroService } from '../../libro/libro.service';
import { EjemplarService } from '../../ejemplar/ejemplar.service';
import { Prestamo } from '../../../core/domain/prestamo';
import { Usuario } from '../../../core/domain/usuario';
import { Libro } from '../../../core/domain/libro';
import { Ejemplar } from '../../../core/domain/ejemplar';

@Component({
  selector: 'app-prestamo-form',
  standalone: false,
  templateUrl: './prestamo-form.component.html'
})
export class PrestamoFormComponent implements OnInit {

    prestamo: Prestamo = {
        ejemplarId: 0,
        usuarioId: 0,
        fechaPrestamo: new Date().toISOString(),
        fechaVencimiento: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // +7 dias default
        estado: 'activo',
        renovaciones: 0
    };

    usuarios: Usuario[] = [];
    libros: Libro[] = [];
    ejemplaresDisponibles: Ejemplar[] = [];

    libroSeleccionadoId: number | null = null; // Variable auxiliar para el select de Libros

    constructor(
        private prestamoService: PrestamoService,
        private usuarioService: UsuarioService,
        private libroService: LibroService,
        private ejemplarService: EjemplarService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cargarCatalogos();
    }

    cargarCatalogos(): void {
        this.usuarioService.findAll().subscribe(data => {
            this.usuarios = data;
            this.cdr.detectChanges(); // Force update
        });
        this.libroService.findAll().subscribe(data => {
            this.libros = data;
            this.cdr.detectChanges(); // Force update
        });
    }

    onLibroChange(): void {
        if (this.libroSeleccionadoId) {
            this.ejemplarService.getEjemplaresPorLibro(this.libroSeleccionadoId).subscribe({
                next: (data: Ejemplar[]) => {
                    // Filtramos solo los disponibles (case-insensitive)
                    this.ejemplaresDisponibles = data.filter((e) => e.estado && e.estado.toLowerCase() === 'disponible');
                    this.cdr.detectChanges(); // Force update
                },
                error: (e: any) => console.error(e)
            });
        }
    }

    guardar(): void {
        this.prestamoService.save(this.prestamo).subscribe({
            next: () => {
                alert('Préstamo registrado exitosamente. Se ha enviado el comprobante PDF por correo.');
                this.router.navigate(['/prestamos']);
            },
            error: (e) => {
                console.error(e);
                let msg = 'Error al registrar préstamo.';
                if (e.error?.message) {
                    msg += ' ' + e.error.message;
                }
                alert(msg);
            }
        });
    }
}
