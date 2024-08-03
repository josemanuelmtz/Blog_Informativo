import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  nombre_autor: string;
  fecha_publicacion: string;
  autor_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private noticiasSubject = new BehaviorSubject<Noticia[]>([]);
  noticias$ = this.noticiasSubject.asObservable(); // Observable para suscribirse

  private apiUrl = 'http://3.135.217.231:3002/noticias';

  constructor(private http: HttpClient) {
    this.loadNoticias(); // Carga inicial de datos
  }

  private loadNoticias() {
    this.http.get<Noticia[]>(this.apiUrl).subscribe(data => {
      this.noticiasSubject.next(data); // Emite los datos a los observadores
    });
  }

  getNoticias(): Observable<Noticia[]> {
    return this.noticias$; // Expose observable for subscription
  }

  addNoticia(nuevaNoticia: { titulo?: string; contenido?: string; autor_id?: number }): Observable<void> {
    return new Observable(observer => {
      this.http.post<{ id: number }>(this.apiUrl, nuevaNoticia).subscribe(response => {
        const noticia: Noticia = {
          id: response.id,
          titulo: nuevaNoticia.titulo || '',
          contenido: nuevaNoticia.contenido || '',
          nombre_autor: 'Desconocido',
          fecha_publicacion: new Date().toISOString(),
          autor_id: nuevaNoticia.autor_id // Añadido aquí
        };
        const currentNoticias = this.noticiasSubject.value;
        this.noticiasSubject.next([...currentNoticias, noticia]); // Notifica a los observadores
        observer.next(); // Notifica a los observadores de que la operación se completó
        observer.complete(); // Completa el observable
      }, error => {
        observer.error(error); // Notifica cualquier error
      });
    });
  }

  updateNoticia(noticia: Noticia) {
    this.http.put(`${this.apiUrl}/${noticia.id}`, noticia).subscribe(() => {
      const currentNoticias = this.noticiasSubject.value;
      const index = currentNoticias.findIndex(n => n.id === noticia.id);
      if (index !== -1) {
        currentNoticias[index] = noticia;
        this.noticiasSubject.next([...currentNoticias]);
      }
    });
  }

  deleteNoticia(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const currentNoticias = this.noticiasSubject.value;
      const filteredNoticias = currentNoticias.filter(n => n.id !== id);
      this.noticiasSubject.next(filteredNoticias);
    });
  }
}
