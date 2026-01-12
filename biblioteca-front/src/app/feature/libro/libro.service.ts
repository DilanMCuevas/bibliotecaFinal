import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../../core/domain/libro';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  // URL del Backend - Ajusta esto cuando configuremos environments
  private apiUrl = environment.apiUrl + '/libros';

  // Nota: Para desarrollo apuntaremos a localhost o a tu Render si ya esta publico.
  // Como mencionaste Render, probaremos con la URL de Render en environment.

  constructor(private http: HttpClient) { }

  findAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  findById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  save(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  update(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
