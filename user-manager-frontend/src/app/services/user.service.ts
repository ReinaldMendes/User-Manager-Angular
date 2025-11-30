import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models'; // Certifique-se que o model aceita id string ou number
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Define a URL base dependendo se é mock ou prod
  // Se for Mock: http://localhost:3000/users
  // Se for Prod: http://localhost:3000/api/users
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * LOGIN
   */
  authenticate(email: string, password: string): Observable<User | null> {
    if (environment.useMockLogic) {
      // --- Lógica Mock ---
      return this.http.get<User[]>(this.api, { params: { email, password } }).pipe(
        map(arr => {
          const user = arr && arr.length ? arr[0] : null;
          if (user) this.saveSession('mock-token', user); // Mock token
          return user;
        })
      );
    } else {
      // --- Lógica API Real ---
      // POST para /api/auth/login
      return this.http.post<any>(environment.authApiUrl, { email, password }).pipe(
        map(response => {
          // A API retorna { message, token, user: {...} }
          // Salvamos o token e retornamos o usuário
          if (response.token && response.user) {
            this.saveSession(response.token, response.user);
            return response.user;
          }
          return null;
        })
      );
    }
  }

  private saveSession(token: string, user: User) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  }

  /**
   * CRUD
   */
  list(params?: any): Observable<User[]> {
    // OBS: A sua API Node "getAllUsers" ATUALMENTE ignora filtros (params).
    // Ela vai retornar tudo. O filtro terá que ser feito no front ou vc ajusta a API.
    return this.http.get<any[]>(this.api, { params }).pipe(
      map(users => users.map(u => this.normalizeId(u)))
    );
  }

  getById(id: string | number) {
    return this.http.get<any>(`${this.api}/${id}`).pipe(
      map(u => this.normalizeId(u))
    );
  }

  create(user: User) {
    return this.http.post<User>(this.api, user);
  }

  update(id: string | number, user: User) {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // Helper para lidar com _id (Mongo) vs id (Front/Mock)
  private normalizeId(user: any): User {
    if (user._id && !user.id) {
      user.id = user._id;
    }
    return user;
  }
}