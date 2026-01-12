import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../../core/domain/prestamo';
import { environment } from '../../../environments/environment';
import { Ejemplar } from '../../core/domain/ejemplar';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private apiUrl = environment.apiUrl + '/prestamos';
  private ejemplarUrl = environment.apiUrl + '/ejemplares'; // Asumimos esta URL, validaremos

  constructor(private http: HttpClient) { }

  findAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  save(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }

  devolver(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/devolver`, {});
  }

  renovar(id: number): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}/renovar`, {});
  }
}
