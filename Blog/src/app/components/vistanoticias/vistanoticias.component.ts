import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vistanoticias',
  templateUrl: './vistanoticias.component.html',
  styleUrls: ['./vistanoticias.component.css']
})
export class VistanoticiasComponent implements OnInit {
  noticias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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

