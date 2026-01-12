import { Component, OnInit } from '@angular/core';
import { LibroService } from '../libro.service';
import { Libro } from '../../../core/domain/libro';

@Component({
  selector: 'app-libro-list',
  standalone: false,
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit {

  libros: Libro[] = [];

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.findAll().subscribe({
      next: (data) => {
        this.libros = data;
        console.log('Libros cargados:', this.libros);
      },
      error: (e) => console.error(e)
    });
  }
}
