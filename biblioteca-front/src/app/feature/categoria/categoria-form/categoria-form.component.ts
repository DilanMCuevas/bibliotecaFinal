import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../../../core/domain/categoria';

@Component({
  selector: 'app-categoria-form',
  standalone: false,
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  categoria: Categoria = {
      id: 0,
      nombre: '',
      descripcion: ''
  };
  loading = false;
  isEditing = false;
  error = '';

  constructor(
      private categoriaService: CategoriaService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
          this.isEditing = true;
          this.loading = true;
          this.categoriaService.findById(+id).subscribe({
              next: (data) => {
                  this.categoria = data;
                  this.loading = false;
              },
              error: () => {
                  this.error = 'No se pudo cargar la categoría';
                  this.loading = false;
              }
          });
      }
  }

  onSubmit() {
      if (!this.categoria.nombre) {
          this.error = 'El nombre es requerido';
          return;
      }
      this.loading = true;

      const request = this.isEditing
        ? this.categoriaService.update(this.categoria.id, this.categoria)
        : this.categoriaService.save(this.categoria);

      request.subscribe({
          next: () => {
              this.loading = false;
              this.router.navigate(['/categorias']);
          },
          error: () => {
              this.loading = false;
              this.error = 'Error al guardar la categoría';
          }
      });
  }
}
