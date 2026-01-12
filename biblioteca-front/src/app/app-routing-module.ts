import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroListComponent } from './feature/libro/libro-list/libro-list.component';
import { AutorListComponent } from './feature/autor/autor-list/autor-list.component';
import { UsuarioListComponent } from './feature/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './feature/usuario/usuario-form/usuario-form.component';
import { PrestamoListComponent } from './feature/prestamo/prestamo-list/prestamo-list.component';
import { PrestamoFormComponent } from './feature/prestamo/prestamo-form/prestamo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/libros', pathMatch: 'full' },
  { path: 'libros', component: LibroListComponent },
  { path: 'autores', component: AutorListComponent },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'prestamos', component: PrestamoListComponent },
  { path: 'prestamos/nuevo', component: PrestamoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
