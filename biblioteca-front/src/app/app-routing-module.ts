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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: RegisterUser },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'libros', component: LibroListComponent, canActivate: [authGuard] },
  { path: 'autores', component: AutorListComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuarioListComponent, canActivate: [authGuard] },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent, canActivate: [authGuard] },
  { path: 'prestamos', component: PrestamoListComponent, canActivate: [authGuard] },
  { path: 'prestamos/nuevo', component: PrestamoFormComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
