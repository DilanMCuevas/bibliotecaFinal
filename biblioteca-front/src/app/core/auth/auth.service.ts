import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Usuario } from '../domain/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserKey = 'currentUser';

    // Observable para que los componentes (como el Navbar) reaccionen al cambio de usuario
    private currentUserSubject: BehaviorSubject<Usuario | null>;
    public currentUser: Observable<Usuario | null>;

    constructor(private http: HttpClient) {
        // Al iniciar, leemos si hay algo en sessionStorage
        const savedUser = sessionStorage.getItem(this.currentUserKey);
        this.currentUserSubject = new BehaviorSubject<Usuario | null>(savedUser ? JSON.parse(savedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(credentials: any): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
            tap(user => {
                sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
                this.currentUserSubject.next(user); // Notificamos a toda la app
            })
        );
    }

    // Método temporal para registro (asumimos que existe endpoint, si no, lo ajustaremos)
    register(usuario: Usuario): Observable<Usuario> {
        // Nota: Ajusta la URL si tu endpoint de registro es distinto, ej: /usuarios o /auth/register
        return this.http.post<Usuario>(`${environment.apiUrl}/usuarios`, usuario);
    }

    logout(): void {
        sessionStorage.removeItem(this.currentUserKey);
        this.currentUserSubject.next(null); // Notificamos que no hay usuario
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getUser(): Usuario | null {
        return this.currentUserSubject.value;
    }

    // Obtener role para futuras validaciones
    isAdmin(): boolean {
        const user = this.getUser();
        return user?.rol === 'admin'; // Asumiendo que el rol se llama 'admin'
    }
}
