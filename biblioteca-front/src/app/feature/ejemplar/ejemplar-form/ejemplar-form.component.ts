import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // importado ActivatedRoute
import { EjemplarService } from '../ejemplar.service';
import { LibroService } from '../../libro/libro.service';
import { Libro } from '../../../core/domain/libro';
import { Ejemplar } from '../../../core/domain/ejemplar';

@Component({
  selector: 'app-ejemplar-form',
  standalone: false,
  templateUrl: './ejemplar-form.component.html',
  styleUrls: ['./ejemplar-form.component.css']
})
export class EjemplarFormComponent implements OnInit {
  ejemplar: Ejemplar = {
    id: 0,
    libroId: 0,
    estado: 'Disponible',
    ubicacion: ''
  };
  libros: Libro[] = [];
  loading = false;
  isEditing = false; // Flag para modo edición
  errorMessage = '';

  estados = ['Disponible', 'Prestado', 'Reservado', 'Mantenimiento', 'Extraviado'];

  constructor(
    private ejemplarService: EjemplarService,
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute, // Inyectado
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.isEditing = true;
        this.loading = true;
        this.ejemplarService.getEjemplarById(+id).subscribe({
            next: (data) => {
                this.ejemplar = data;
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'No se pudo cargar el ejemplar';
                this.loading = false;
            }
        });
    }
  }

  cargarLibros(): void {
      this.libroService.findAll().subscribe({
          next: (data) => {
              this.libros = data;
              this.cdr.detectChanges();
          },
          error: (err) => console.error('Error cargando libros', err)
      });
  }

  onSubmit(): void {
    if (this.ejemplar.libroId === 0 || !this.ejemplar.ubicacion) {
        this.errorMessage = 'Por favor selecciona un libro e ingresa una ubicación.';
        return;
    }

    this.loading = true;

    // Corregimos los nombres de metodos del servicio segun EjemplarService real
    const request = this.isEditing
        ? this.ejemplarService.updateEjemplar(this.ejemplar.id, this.ejemplar)
        : this.ejemplarService.createEjemplar(this.ejemplar);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/ejemplares']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al guardar el ejemplar.';
        this.loading = false;
      }
    });
  }
}
