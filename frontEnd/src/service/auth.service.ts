import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  register(nombre: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/register`, { nombre, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiURL}/login`, { email, password })
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
