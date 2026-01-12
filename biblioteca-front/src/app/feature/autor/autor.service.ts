import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../core/domain/autor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private apiUrl = environment.apiUrl + '/autores';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  save(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }
}
