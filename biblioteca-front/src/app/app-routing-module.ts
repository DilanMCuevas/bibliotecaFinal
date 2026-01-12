import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroListComponent } from './feature/libro/libro-list/libro-list.component';
import { AutorListComponent } from './feature/autor/autor-list/autor-list.component';
import { UsuarioListComponent } from './feature/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './feature/usuario/usuario-form/usuario-form.component';
import { PrestamoListComponent } from './feature/prestamo/prestamo-list/prestamo-list.component';
import { PrestamoFormComponent } from './feature/prestamo/prestamo-form/prestamo-form.component';
import { Login } from './feature/auth/login/login';
import { RegisterUser } from './feature/auth/register-user/register-user';
import { authGuard } from './core/guard/auth.guard';
import { HomeComponent } from './feature/home/home/home.component';
import { CategoriaListComponent } from './feature/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './feature/categoria/categoria-form/categoria-form.component';
import { EjemplarListComponent } from './feature/ejemplar/ejemplar-list/ejemplar-list.component';
import { EjemplarFormComponent } from './feature/ejemplar/ejemplar-form/ejemplar-form.component';
import { AutorFormComponent } from './feature/autor/autor-form/autor-form.component';
import { ReservaListComponent } from './feature/reserva/reserva-list/reserva-list.component';
import { ReservaFormComponent } from './feature/reserva/reserva-form/reserva-form.component';
import { MultaListComponent } from './feature/multa/multa-list/multa-list.component';
import { ResenaListComponent } from './feature/resena/resena-list/resena-list.component';
import { ResenaFormComponent } from './feature/resena/resena-form/resena-form.component';
import { LibroFormComponent } from './feature/libro/libro-form/libro-form.component';
import { MultaFormComponent } from './feature/multa/multa-form/multa-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: RegisterUser },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'libros', component: LibroListComponent, canActivate: [authGuard] },
  { path: 'libros/nuevo', component: LibroFormComponent, canActivate: [authGuard] },
  { path: 'libros/editar/:id', component: LibroFormComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriaListComponent, canActivate: [authGuard] },
  { path: 'categorias/nueva', component: CategoriaFormComponent, canActivate: [authGuard] },
  { path: 'categorias/editar/:id', component: CategoriaFormComponent, canActivate: [authGuard] },
  { path: 'autores', component: AutorListComponent, canActivate: [authGuard] },
  { path: 'autores/nuevo', component: AutorFormComponent, canActivate: [authGuard] },
  { path: 'autores/editar/:id', component: AutorFormComponent, canActivate: [authGuard] },
  { path: 'ejemplares', component: EjemplarListComponent, canActivate: [authGuard] },
  { path: 'ejemplares/nuevo', component: EjemplarFormComponent, canActivate: [authGuard] },
  { path: 'ejemplares/editar/:id', component: EjemplarFormComponent, canActivate: [authGuard] },
  { path: 'reservas', component: ReservaListComponent, canActivate: [authGuard] },
  { path: 'reservas/nueva', component: ReservaFormComponent, canActivate: [authGuard] },
  { path: 'resenas', component: ResenaListComponent, canActivate: [authGuard] },
  { path: 'resenas/nueva', component: ResenaFormComponent, canActivate: [authGuard] },
  { path: 'multas', component: MultaListComponent, canActivate: [authGuard] },
  { path: 'multas/nueva', component: MultaFormComponent, canActivate: [authGuard] },
  { path: 'multas/editar/:id', component: MultaFormComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuarioListComponent, canActivate: [authGuard] },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'prestamos', component: PrestamoListComponent, canActivate: [authGuard] },
  { path: 'prestamos/nuevo', component: PrestamoFormComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
