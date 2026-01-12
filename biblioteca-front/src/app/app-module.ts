import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importante para servicios HTTP
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
// Importamos el componente (normalmente deberiamos tener un Modulo por Feature, pero por simplicidad lo pondre aqui primero)
import { LibroListComponent } from './feature/libro/libro-list/libro-list.component';
import { AutorListComponent } from './feature/autor/autor-list/autor-list.component';
import { UsuarioListComponent } from './feature/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './feature/usuario/usuario-form/usuario-form.component';
import { PrestamoListComponent } from './feature/prestamo/prestamo-list/prestamo-list.component';
import { PrestamoFormComponent } from './feature/prestamo/prestamo-form/prestamo-form.component';

@NgModule({
  declarations: [
    App,
    LibroListComponent,
    AutorListComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    PrestamoListComponent,
    PrestamoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Agregamos FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
