import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../../core/domain/resena';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl = `${environment.apiUrl}/resenas`;

  constructor(private http: HttpClient) { }

  findByLibroId(libroId: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/libro/${libroId}`);
  }

  findAll(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }

  findById(id: number): Observable<Resena> {
    return this.http.get<Resena>(`${this.apiUrl}/${id}`);
  }

  save(resena: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  update(id: number, resena: Resena): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/${id}`, resena);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
