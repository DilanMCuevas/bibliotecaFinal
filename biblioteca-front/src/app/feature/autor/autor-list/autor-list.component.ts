import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private autorService: AutorService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.loading = true;
    this.error = false;
    this.autorService.findAll().subscribe({
      next: (data) => {
          this.autores = data;
          this.loading = false;
          this.cd.detectChanges();
      },
      error: (e) => {
          console.error(e);
          this.error = true;
          this.loading = false;
          this.cd.detectChanges();
      }
    });
  }
}
