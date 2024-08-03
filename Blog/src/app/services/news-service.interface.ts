// news-service.interface.ts
import { Observable } from 'rxjs';

export interface NewsService {
  getNoticias(): Observable<any[]>;
}
