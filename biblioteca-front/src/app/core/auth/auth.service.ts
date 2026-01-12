import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../domain/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserKey = 'currentUser';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
            tap(user => {
                sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
            })
        );
    }

    logout(): void {
        sessionStorage.removeItem(this.currentUserKey);
    }

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem(this.currentUserKey);
    }

    getUser(): Usuario | null {
        const userStr = sessionStorage.getItem(this.currentUserKey);
        return userStr ? JSON.parse(userStr) : null;
    }
}
