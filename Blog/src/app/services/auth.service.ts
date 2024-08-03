/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';

  constructor() { }

  setToken(token: string, role: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'administrador';
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  // Inicia sesión y almacena el token en localStorage
  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, contrasena });
  }

  // Guarda el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtiene el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Configura los encabezados para las solicitudes autenticadas
  getHttpHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://3.135.217.231:3002';

  constructor(private http: HttpClient) {}

  // Almacena el token y el rol en el almacenamiento local
  setToken(token: string, role: string, id_u: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', id_u); 
  }

  // Obtiene el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Obtiene el rol del almacenamiento local
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): number | null {
    const id = localStorage.getItem(this['userId']);
    return id ? parseInt(id, 10) : null;
  }
  

  // Configura los encabezados para las solicitudes autenticadas
 /* getHttpHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }*/

/*
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private userIdKey = 'userId';

  constructor() {}

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  token(): string | null {
    
    const userId = this.userIdKey;
    
    return userId || null; 
  }

  setToken(token: string, role: string, userId: number): void {
    if (token && role && userId != null) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.roleKey, role);
      localStorage.setItem(this.userIdKey, userId.toString());
    } else {
      console.error('Token, role, or userId is missing or invalid');
    }
  }
  /*
  getHttpHeaders(): HttpHeaders {
    const token = this.getToken();
    const role = this.getRole(); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }*/

}


