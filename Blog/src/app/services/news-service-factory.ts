// news-service-factory.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from './news-service.interface';
import { NewsApiService } from './news-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceFactory {
  constructor(private http: HttpClient) {}

  createService(): NewsService {
    return new NewsApiService(this.http);
  }
}
