import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  onInputUsuario(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.usuario = inputElement.value;
  }

  onInputContrasena(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.contrasena = inputElement.value;
  }

  login() {
    if (!this.usuario || !this.contrasena) {
      console.error('Por favor, proporcione usuario y contraseña');
      return;
    }

    const params = new HttpParams()
      .set('usuario', this.usuario)
      .set('contrasena', this.contrasena);

    //const url = 'http://localhost:3002/login'; // Asegúrate de ajustar el puerto y la ruta según tu configuración de Express
    const url = 'http://18.218.24.14:3002/login';

    this.http.get<any>(url, { params }).subscribe(
      response => {
        if (response.message === 'Inicio de sesión exitoso') {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/inicio']);
          // Aquí puedes redirigir a otra página o manejar el éxito del inicio de sesión
        } else {
          console.error('Credenciales incorrectas');
          // Aquí puedes mostrar un mensaje al usuario indicando que las credenciales son incorrectas
        }
      },
      error => {
        console.error('Error en el inicio de sesión:', error);
        // Aquí puedes manejar errores de conexión u otros errores que puedan ocurrir
      }
    );
  }
}