import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../../../core/domain/prestamo';
import { UsuarioService } from '../../usuario/usuario.service';
import { LibroService } from '../../libro/libro.service';
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
    usuarioMap = new Map<number, string>();
    libroMap = new Map<number, string>();
    loading: boolean = true;
    error: boolean = false;

    constructor(private prestamoService: PrestamoService) {}

    ngOnInit(): void {
        this.cargarPrestamos();
    }

    cargarPrestamos(): void {
        this.loading = true;
        this.prestamoService.findAll().subscribe({
            next: (data) => {
                this.prestamos = data;
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
                this.error = true;
            }
        });
    }
}
