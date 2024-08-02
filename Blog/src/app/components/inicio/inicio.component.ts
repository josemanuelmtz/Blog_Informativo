import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  noticias: any[] = [];
  role: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedRole = localStorage.getItem('userRole');
    console.log('Stored role:', storedRole); // Depuración
    this.role = storedRole;
    this.http.get<any[]>('http://localhost:3002/noticias').subscribe(
      data => {
        this.noticias = data;
      },
      error => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }

  
}

