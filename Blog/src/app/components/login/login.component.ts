import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get usuario() {
    return this.loginForm.get('usuario');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }

/*
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { usuario, contrasena } = this.loginForm.value;
    const url = 'http://localhost:3002/login';
    const credentials = { usuario, contrasena };

    this.http.post<any>(url, credentials).subscribe(
      response => {
        if (response.message === 'Inicio de sesión exitoso') {
          this.authService.setToken(response.token, response.role, response.id_u);  // Almacena el token y el rol
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Inicio de sesión exitoso.'
          });
          this.router.navigate(['/inicio']);
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'El usuario y/o contraseña son incorrectos.'
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema con el inicio de sesión. Por favor, inténtelo más tarde.'
        });
      }
    );
  }*/
    login() {
      if (this.loginForm.invalid) {
        return;
      }
  
      const { usuario, contrasena } = this.loginForm.value;
      const url = 'https://3.147.61.80:3002/login';
      const credentials = { usuario, contrasena };
      console.log(url);
      console.log(credentials);
      this.http.post<any>(url, credentials).subscribe(
        
        response => {
          this.authService.setToken(response.token, response.user.rol, response.user.id_u);
          
          if (response.message === 'Inicio de sesión exitoso') {
            console.log('ROL:' + response.user.rol);
            console.log(response.message);
            // Almacena el token, el rol y el ID del usuario
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Inicio de sesión exitoso.'
            });
              this.router.navigate(['/inicio']);
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'El usuario y/o contraseña son incorrectos.'
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema con el inicio de sesión. Por favor, inténtelo más tarde.'
          });
        }
      );
    }
  
}
