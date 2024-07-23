import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  onInputUsuario(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.usuario = inputElement.value;
  }

  onInputCorreo(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.correo = inputElement.value;
  }

  onInputContrasena(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.contrasena = inputElement.value;
  }

  register() {
    if (!this.usuario || !this.correo || !this.contrasena) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    const newUser = { usuario: this.usuario, correo: this.correo, contrasena: this.contrasena };

    const url = 'http://localhost:3002/register'; // Ajusta el puerto y la ruta según tu configuración de Express
    //const url = 'http://3.144.118.212:3002/register';

    this.http.post<any>(url, newUser).subscribe(
      response => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/inicio']);
        // Aquí puedes redirigir a otra página o manejar el éxito del registro
      },
      error => {
        console.error('Error al registrar usuario:', error);
        // Aquí puedes manejar errores de conexión u otros errores que puedan ocurrir
      }
    );
  }
}