import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service'; 

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {  
    if (this.userService.checkLoginStatus()) { 
      return true; // Permitir el acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false; // No permitir el acceso
    }
  }
}
