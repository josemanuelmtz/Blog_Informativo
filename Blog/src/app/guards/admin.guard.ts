/*
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/inicio']); // Redirige si no es administrador
      return false;
    }
  }
}
*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getRole(); // Obtén el rol del usuario

    if (userRole === '1') {
        console.log('SI ENTRO AQUI');
      return true; // Permitir acceso si el rol es admin
    } else {
        console.log('DEBERIA ENTRO AQUI');
      this.router.navigate(['/inicio']); // Redirigir si no es admin
      return false;
    }
  }
}

