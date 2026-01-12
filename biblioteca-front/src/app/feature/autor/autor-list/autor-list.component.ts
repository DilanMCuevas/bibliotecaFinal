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

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.autorService.findAll().subscribe({
      next: (data) => this.autores = data,
      error: (e) => console.error(e)
    });
  }
}
