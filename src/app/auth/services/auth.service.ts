import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;

  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser$: Observable<any | null>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('token'));
    this.token$ = this.tokenSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<any | null>(
      JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/login', { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token);
            this.setCurrentUser(response.user);
          }
        }),
        catchError(error => {
          console.error('Login failed:', error); // Log the error to console
          throw error; // Rethrow the error to propagate it further
        })
      );
  }

  logout(): void {
    this.clearToken(); // Make sure clearToken is public
    this.clearCurrentUser(); // Make sure clearCurrentUser is public
  }

  public setToken(token: string): void { // Change to public
    sessionStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  public clearToken(): void { // Change to public
    sessionStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  public setCurrentUser(user: any): void { // Change to public
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public clearCurrentUser(): void { // Change to public
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): any | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
