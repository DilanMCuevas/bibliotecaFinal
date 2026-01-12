import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestamoService } from '../prestamo.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { LibroService } from '../../libro/libro.service';
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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cargarCatalogos();
    }

    cargarCatalogos(): void {
        this.usuarioService.findAll().subscribe(data => this.usuarios = data);
        this.libroService.findAll().subscribe(data => this.libros = data);
    }

    onLibroChange(): void {
        if (this.libroSeleccionadoId) {
            this.prestamoService.findEjemplaresByLibro(this.libroSeleccionadoId).subscribe({
                next: (data) => {
                    // Filtramos solo los disponibles
                    this.ejemplaresDisponibles = data.filter(e => e.estado === 'disponible');
                },
                error: (e) => console.error(e)
            });
        }
    }

    guardar(): void {
        // Aseguramos fechas en formato ISO
        this.prestamoService.save(this.prestamo).subscribe({
            next: () => this.router.navigate(['/prestamos']),
            error: (e) => {
                console.error(e);
                alert('Error al crear préstamo');
            }
        });
    }
}
