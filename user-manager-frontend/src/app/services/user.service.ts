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
  // simple authentication against mock JSON: finds user by email
  authenticate(email: string): Observable<User | null> {
    return this.http.get<User[]>(this.api, { params: { email } }).pipe(
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
