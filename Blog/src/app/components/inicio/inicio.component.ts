import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsServiceFactory } from '../../services/news-service-factory';
import { NewsService } from '../../services/news-service.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  noticias: any[] = [];
  role: string | null = null;
  private newsService: NewsService;
  
  constructor(private newsServiceFactory: NewsServiceFactory) {
    this.newsService = this.newsServiceFactory.createService();
  }
  ngOnInit(): void {
    const storedRole = localStorage.getItem('userRole');
    console.log('Stored role:', storedRole); // Depuración
    this.role = storedRole;
    this.newsService.getNoticias().subscribe(
      data => {
        this.noticias = data;
      },
      error => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }
  
}

