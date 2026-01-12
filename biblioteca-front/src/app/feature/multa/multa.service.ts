import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multa } from '../../core/domain/multa';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultaService {
  private apiUrl = `${environment.apiUrl}/multas`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Multa[]> {
    return this.http.get<Multa[]>(this.apiUrl);
  }

  findById(id: number): Observable<Multa> {
    return this.http.get<Multa>(`${this.apiUrl}/${id}`);
  }

  save(multa: Multa): Observable<Multa> {
    return this.http.post<Multa>(this.apiUrl, multa);
  }

  update(id: number, multa: Multa): Observable<Multa> {
    return this.http.put<Multa>(`${this.apiUrl}/${id}`, multa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  pagar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/pagar`, {});
  }
}
