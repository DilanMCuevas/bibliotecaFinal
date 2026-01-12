import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservaService } from '../reserva.service';
import { LibroService } from '../../libro/libro.service';
import { AuthService } from '../../../core/auth/auth.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Reserva } from '../../../core/domain/reserva';
import { Libro } from '../../../core/domain/libro';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-reserva-form',
  standalone: false,
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  reserva: Reserva = {
    id: 0,
    usuarioId: 0,
    libroId: 0,
    fechaReserva: new Date(),
    estado: 'PENDIENTE'
  };

  libros: Libro[] = [];
  usuarios: Usuario[] = [];
  isAdmin = false;
  titulo = 'Nueva Reserva';
  isEditMode = false;

  constructor(
    private reservaService: ReservaService,
    private libroService: LibroService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    this.isAdmin = currentUser?.rol === 'admin'; // Corrected to lowercase 'admin' based on other files

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.isEditMode = true;
        this.titulo = 'Editar Reserva';
        this.reservaService.findById(+id).subscribe({
            next: (data) => {
                this.reserva = data;
                // If date comes as string, ensure it's handled or used as is if input type=date supports it
                this.cdr.detectChanges();
            },
            error: (err) => console.error(err)
        });
    }

    // Cargar libros disponibles
    this.libroService.findAll().subscribe(data => {
      this.libros = data;
      this.cdr.detectChanges();
    });

    if (this.isAdmin) {
      this.usuarioService.findAll().subscribe(data => {
        this.usuarios = data;
        this.cdr.detectChanges();
      });
    } else if (currentUser && currentUser.id && !this.isEditMode) { // Only set default user if new
      this.reserva.usuarioId = currentUser.id;
    }
  }

  guardar(): void {
    if (this.isEditMode) {
        this.reservaService.update(this.reserva.id, this.reserva).subscribe({
            next: () => {
                alert('Reserva actualizada correctamente.');
                this.router.navigate(['/reservas']);
            },
            error: (err) => {
                console.error(err);
                alert('Error al actualizar reserva: ' + (err.error?.message || 'Verifique datos'));
            }
        });
    } else {
        this.reservaService.save(this.reserva).subscribe({
            next: () => {
                alert('Reserva creada exitosamente.');
                this.router.navigate(['/reservas']);
            },
            error: (err) => {
                console.error(err);
                alert('Error al guardar la reserva: ' + (err.error?.message || 'Verifique disponibilidad'));
            }
        });
    }
  }
}
