// news-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsService } from './news-service.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService implements NewsService {
  private apiUrl = 'https://3.135.217.231:3002/noticias';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
