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

  // Necesitamos buscar ejemplares DISPONIBLES para prestar
  // Si no tienes un endpoint especifico, traeremos todos y filtraremos en el front (no ideal pero funciona)
  findEjemplaresByLibro(libroId: number): Observable<Ejemplar[]> {
     // Intento de ruta comun: /api/ejemplares/por-libro/{id}
     // O buscamos todos los ejemplares y filtramos.
     // Segun la estructura Java, parece que Ejemplar es un modulo aparte
     return this.http.get<Ejemplar[]>(`${this.ejemplarUrl}/por-libro/${libroId}`);
  }
}
