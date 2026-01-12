import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loading: boolean = true;
  error: boolean = false;

  constructor(private libroService: LibroService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.loading = true;
    this.error = false;
    this.libroService.findAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.error = true;
        this.cd.detectChanges();
      }
    });
  }
}
