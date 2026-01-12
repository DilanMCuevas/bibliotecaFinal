import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutorService } from '../autor.service';
import { Autor } from '../../../core/domain/autor';

@Component({
  selector: 'app-autor-form',
  standalone: false,
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.css']
})
export class AutorFormComponent implements OnInit {
  autor: Autor = {
    id: 0,
    nombre: '',
    bio: ''
  };
  loading = false;
  isEditing = false;
  errorMessage = '';

  constructor(
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.isEditing = true;
        this.loading = true;
        this.autorService.findById(+id).subscribe({
            next: (data) => {
                this.autor = data;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error al cargar el autor';
                this.loading = false;
            }
        });
    }
  }

  onSubmit(): void {
    if (!this.autor.nombre) {
        this.errorMessage = 'El nombre del autor es obligatorio.';
        return;
    }

    this.loading = true;

    const request = this.isEditing
        ? this.autorService.update(this.autor.id, this.autor)
        : this.autorService.save(this.autor);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/autores']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al guardar el autor.';
        this.loading = false;
      }
    });
  }
}
