import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejemplar } from '../../core/domain/ejemplar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjemplarService {
  private apiUrl = `${environment.apiUrl}/ejemplares`;

  constructor(private http: HttpClient) { }

  getEjemplares(): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(this.apiUrl);
  }

  getEjemplarById(id: number): Observable<Ejemplar> {
    return this.http.get<Ejemplar>(`${this.apiUrl}/${id}`);
  }

  getEjemplaresPorLibro(libroId: number): Observable<Ejemplar[]> {
    return this.http.get<Ejemplar[]>(`${this.apiUrl}/por-libro/${libroId}`);
  }

  createEjemplar(ejemplar: Ejemplar): Observable<Ejemplar> {
    return this.http.post<Ejemplar>(this.apiUrl, ejemplar);
  }

  updateEjemplar(id: number, ejemplar: Ejemplar): Observable<Ejemplar> {
    return this.http.put<Ejemplar>(`${this.apiUrl}/${id}`, ejemplar);
  }

  deleteEjemplar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
