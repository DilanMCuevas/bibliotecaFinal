import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MultaService } from '../multa.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Multa } from '../../../core/domain/multa';
import { Usuario } from '../../../core/domain/usuario';

@Component({
  selector: 'app-multa-form',
  standalone: false,
  templateUrl: './multa-form.component.html'
})
export class MultaFormComponent implements OnInit {

  multa: Multa = {
      id: 0,
      prestamoId: 0, // Opcional o 0 si es manual
      usuarioId: 0,
      monto: 0,
      motivo: '',
      estado: 'PENDIENTE',
      fechaGeneracion: new Date()
  };

  usuarios: Usuario[] = [];
  titulo = 'Nueva Multa';
  isEditMode = false;

  constructor(
    private multaService: MultaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.isEditMode = true;
        this.titulo = 'Editar Multa';
        this.multaService.findById(+id).subscribe({
            next: (data) => {
                this.multa = data;
                this.cdr.detectChanges();
            },
            error: (err) => console.error(err)
        });
    }
  }

  cargarUsuarios(): void {
      this.usuarioService.findAll().subscribe(data => {
          this.usuarios = data;
          this.cdr.detectChanges();
      });
  }

  guardar(): void {
      if (this.isEditMode) {
          this.multaService.update(this.multa.id, this.multa).subscribe({
              next: () => {
                   alert('Multa actualizada correctamente.');
                   this.router.navigate(['/multas']);
              },
              error: (e) => {
                   console.error(e);
                   alert('Error al actualizar multa.');
              }
          });
      } else {
          this.multaService.save(this.multa).subscribe({
              next: () => {
                   alert('Multa generada exitosamente.');
                   this.router.navigate(['/multas']);
              },
              error: (e) => {
                   console.error(e);
                   alert('Error al crear multa.');
              }
          });
      }
  }
}
