import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  list(params?: any): Observable<User[]> {
    return this.http.get<User[]>(this.api, { params });
  }
  authenticate(email: string, password: string): Observable<User | null> {
    // Querying by both email and password on the mock server
    return this.http.get<User[]>(this.api, { params: { email, password } }).pipe(
      map(arr => (arr && arr.length ? arr[0] : null))
    );
  }
  getById(id: number) {
    return this.http.get<User>(`${this.api}/${id}`);
  }
  create(user: User) {
    return this.http.post<User>(this.api, user);
  }
  update(id: number, user: User) {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
