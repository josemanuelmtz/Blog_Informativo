import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  isModalOpen: boolean | undefined;
  registroForm!: FormGroup;

  constructor(private http: HttpClient,private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
/*
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
*/
  get usuario() {
    return this.registroForm.get('usuario');
  }

  get correo() {
    return this.registroForm.get('correo');
  }

  get contrasena() {
    return this.registroForm.get('contrasena');
  }

  openModal() {
    if (!this.usuario || !this.correo || !this.contrasena) {
      console.error('Por favor, complete todos los campos');
      return;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmRegister() {
    if (!this.usuario || !this.correo || !this.contrasena) {
      console.error('Por favor, complete todos los campos');
      return;
    }
  }
/*
  register() {
    if (!this.usuario || !this.correo || !this.contrasena) {
      console.error('Por favor, complete todos los campos');
      return;
    }
  }*/

  register() {
    if (this.registroForm.invalid) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      html: `
        Al registrarte aceptas nuestra 
        <a href="https://www.privacypolicies.com/live/7dc13845-9481-4cb4-819f-3d2eb937ceba" target="_blank" style="color: #3085d6;">Política de Privacidad</a>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        const newUser = this.registroForm.value;

        const url = 'http://localhost:3002/register'; 

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
      } else {
        Swal.fire({
          title: 'Registro cancelado',
          text: 'Registro cancelado por el usuario',
          icon: 'error',
          showCancelButton: false,
        });
        console.log('Registro cancelado');
      }
    });
  }
    /*
  
    // Solicitar confirmación antes de registrar
    Swal.fire({
      title: '¿Estás seguro?',
      html: `
      Al registrarte aceptas nuestra 
      <a href="https://www.privacypolicies.com/live/7dc13845-9481-4cb4-819f-3d2eb937ceba" target="_blank" style="color: #3085d6;">Política de Privacidad</a>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        const newUser = { usuario: this.usuario, correo: this.correo, contrasena: this.contrasena };
  
        const url = 'http://localhost:3002/register'; 
  
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
      } else {
        Swal.fire({
          title: 'Registro cancelado',
          text: 'Registro cancelado por el usuario',
          icon: 'error',
          showCancelButton: false,
        })
        console.log('Registro cancelado');
      }
    });
  }
  */
}