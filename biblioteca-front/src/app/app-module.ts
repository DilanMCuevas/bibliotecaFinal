import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LibroListComponent } from './feature/libro/libro-list/libro-list.component';
import { LibroFormComponent } from './feature/libro/libro-form/libro-form.component';
import { AutorListComponent } from './feature/autor/autor-list/autor-list.component';
import { UsuarioListComponent } from './feature/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './feature/usuario/usuario-form/usuario-form.component';
import { PrestamoListComponent } from './feature/prestamo/prestamo-list/prestamo-list.component';
import { PrestamoFormComponent } from './feature/prestamo/prestamo-form/prestamo-form.component';
import { Login } from './feature/auth/login/login';
import { RegisterUser } from './feature/auth/register-user/register-user';
import { HomeComponent } from './feature/home/home/home.component';
import { CategoriaListComponent } from './feature/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './feature/categoria/categoria-form/categoria-form.component';
import { EjemplarListComponent } from './feature/ejemplar/ejemplar-list/ejemplar-list.component';
import { EjemplarFormComponent } from './feature/ejemplar/ejemplar-form/ejemplar-form.component';
import { AutorFormComponent } from './feature/autor/autor-form/autor-form.component';
import { ReservaListComponent } from './feature/reserva/reserva-list/reserva-list.component';
import { ReservaFormComponent } from './feature/reserva/reserva-form/reserva-form.component';
import { MultaListComponent } from './feature/multa/multa-list/multa-list.component';
import { MultaFormComponent } from './feature/multa/multa-form/multa-form.component';
import { ResenaListComponent } from './feature/resena/resena-list/resena-list.component';
import { ResenaFormComponent } from './feature/resena/resena-form/resena-form.component';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    LibroListComponent,
    LibroFormComponent,
    AutorListComponent,
    AutorFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    PrestamoListComponent,
    PrestamoFormComponent,
    CategoriaListComponent,
    CategoriaFormComponent,
    EjemplarListComponent,
    EjemplarFormComponent,
    ReservaListComponent,
    ReservaFormComponent,
    MultaListComponent,
    MultaFormComponent,
    ResenaListComponent,
    ResenaFormComponent,
    Login,
    RegisterUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
