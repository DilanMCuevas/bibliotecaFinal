import { Component, OnInit } from '@angular/core';
import { AutorService } from '../autor.service';
import { Autor } from '../../../core/domain/autor';

@Component({
  selector: 'app-autor-list',
  standalone: false,
  templateUrl: './autor-list.component.html'
})
export class AutorListComponent implements OnInit {

  autores: Autor[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.loading = true;
    this.autorService.findAll().subscribe({
      next: (data) => {
          this.autores = data;
          this.loading = false;
      },
      error: (e) => {
          console.error(e);
          this.error = true;
          this.loading = false;
      }
    });
  }
}
