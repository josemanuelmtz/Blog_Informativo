import { Component } from '@angular/core';

interface Noticia {
  titulo: string;
  contenido: string;
  autor: string;
  fecha: string;
}

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent {
  noticias: Noticia[] = [
    { titulo: 'Noticia 1', contenido: 'Contenido de la noticia 1.', autor: 'Autor 1', fecha: '2024-07-01' },
    { titulo: 'Noticia 2', contenido: 'Contenido de la noticia 2.', autor: 'Autor 2', fecha: '2024-07-02' },
    { titulo: 'Noticia 3', contenido: 'Contenido de la noticia 3.', autor: 'Autor 3', fecha: '2024-07-03' },
  ];

  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  currentNoticia: Noticia | undefined;
  noticiaToDelete: Noticia | undefined;

  editNews(noticia: Noticia) {
    this.currentNoticia = { ...noticia };
    this.showEditModal = true;
  }

  deleteNews(noticia: Noticia) {
    this.noticiaToDelete = noticia;
    this.showDeleteModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  onEditSubmit() {
    if (this.currentNoticia) {
      const index = this.noticias.findIndex(n => n.titulo === this.currentNoticia?.titulo);
      if (index > -1) {
        this.noticias[index] = this.currentNoticia;
      }
      this.showEditModal = false;
    }
  }

  confirmDelete() {
    if (this.noticiaToDelete) {
      this.noticias = this.noticias.filter(n => n !== this.noticiaToDelete);
      this.showDeleteModal = false;
    }
  }
}

