import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibroService } from '../libro.service';
import { Libro } from '../../../core/domain/libro';

@Component({
  selector: 'app-libro-form',
  standalone: false,
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css'] // opcional si lo creas
})
export class LibroFormComponent implements OnInit {
  libro: Libro = {
    id: 0,
    titulo: '',
    isbn: '',
    editorial: '',
    anio: new Date().getFullYear(),
    edicion: '',
    sinopsis: ''
  };
  loading = false;
  errorMessage = '';

  constructor(
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.loading = true;
        this.libroService.findById(+id).subscribe({
            next: (data) => {
                this.libro = data;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Error al cargar el libro';
                this.loading = false;
            }
        });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    const obs = this.libro.id
        ? this.libroService.update(this.libro.id, this.libro)
        : this.libroService.save(this.libro);

    obs.subscribe({
        next: () => {
            this.loading = false;
            this.router.navigate(['/libros']);
        },
        error: (err) => {
            console.error(err);
            this.errorMessage = 'Error al guardar el libro';
            this.loading = false;
        }
    });
  }
}
