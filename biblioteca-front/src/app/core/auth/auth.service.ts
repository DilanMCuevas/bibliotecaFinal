import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Usuario } from '../domain/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserKey = 'currentUser';
    private currentUserSubject: BehaviorSubject<Usuario | null>;
    public currentUser: Observable<Usuario | null>;

    constructor(private http: HttpClient) {
        const userStr = sessionStorage.getItem(this.currentUserKey);
        const user = userStr ? JSON.parse(userStr) : null;
        this.currentUserSubject = new BehaviorSubject<Usuario | null>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(credentials: any): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
            tap(user => {
                sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        sessionStorage.removeItem(this.currentUserKey);
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value; // check current subject value
    }

    getUser(): Usuario | null {
        return this.currentUserSubject.value;
    }
}
