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
    usuariosMap: Map<number,Usuario> = new Map();
    // Mapa simple para mostrar IDs en vez de nombres si no cargamos todo
    // Idealmente el backend en el GET /prestamos deberia devolver DTOs con nombres de usuario y titulo de libro

    constructor(private prestamoService: PrestamoService) {}

    ngOnInit(): void {
        this.cargarPrestamos();
    }

    cargarPrestamos(): void {
        this.prestamoService.findAll().subscribe(data => {
            this.prestamos = data;
        });
    }
}
