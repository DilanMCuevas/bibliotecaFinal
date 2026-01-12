import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResenaService } from '../resena.service';
import { LibroService } from '../../libro/libro.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Resena } from '../../../core/domain/resena';
import { Libro } from '../../../core/domain/libro';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resena-form',
  standalone: false,
  templateUrl: './resena-form.component.html',
  styleUrls: ['./resena-form.component.css']
})
export class ResenaFormComponent implements OnInit {
  resena: Resena = {
    id: 0,
    usuarioId: 0,
    libroId: 0,
    rating: 5, // Changed from calificacion to rating to match backend
    comentario: '',
    // fecha removed as it's not in backend entity
  } as any; // Using any temporarily if interface mismatch persists

  libros: Libro[] = [];
  titulo = 'Nueva Reseña';
  isEditMode = false;

  constructor(
    private resenaService: ResenaService,
    private libroService: LibroService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.id) {
      this.resena.usuarioId = user.id;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
        this.isEditMode = true;
        this.titulo = 'Editar Reseña';
        this.resenaService.findById(+id).subscribe(data => {
            this.resena = data;
            this.cdr.detectChanges();
        });
    }

    // Cargar libros para selección
    this.libroService.findAll().subscribe(data => {
      this.libros = data;
      this.cdr.detectChanges();
    });
  }

  guardar(): void {
    if (this.resena.usuarioId === 0) {
        alert('Debes estar logueado para hacer una reseña');
        return;
    }

    if (this.isEditMode) {
        this.resenaService.update(this.resena.id, this.resena).subscribe({
            next: () => {
                alert('Reseña actualizada correctamente.');
                this.router.navigate(['/resenas']);
            },
            error: (err) => {
                console.error(err);
                alert('Error al actualizar reseña.');
            }
        });
    } else {
        this.resenaService.save(this.resena).subscribe({
            next: () => {
                alert('Reseña publicada exitosamente.');
                this.router.navigate(['/resenas']);
            },
            error: (err) => {
                console.error(err);
                let msg = 'Error al guardar reseña.';
                if (err.error?.message) msg += ' ' + err.error.message;
                alert(msg);
            }
        });
    }
  }
}
