import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  nombre_autor: string;
  fecha_publicacion: string;
}

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showCreateModal: boolean = false;
  currentNoticia: Noticia = {
    id: 0,
    titulo: '',
    contenido: '',
    nombre_autor: '',
    fecha_publicacion: ''
  };
  noticiaToDelete!: Noticia;
  newNoticia: Partial<Noticia> = {}; // Se usa Partial para permitir campos opcionales al crear

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNoticias();
  }

  loadNoticias() {
    this.http.get<Noticia[]>('http://localhost:3002/noticias').subscribe(data => {
      this.noticias = data;
    });
  }

  editNews(noticia: Noticia) {
    this.currentNoticia = { ...noticia };
    if (this.currentNoticia) {
      this.showEditModal = true;
    }
  }  
/*
  deleteNews(noticia: Noticia) {
    this.noticiaToDelete = noticia;
    this.showDeleteModal = true;
  }
*/
  openCreateModal() {
    this.newNoticia = {}; // Resetear campos al abrir el modal
    this.showCreateModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
/*
  onEditSubmit() {
    if (this.currentNoticia) {
      const { id, titulo, contenido } = this.currentNoticia;
      const autor_id = 1; // Suponiendo un autor_id estático por simplicidad, deberías ajustar esto según tu lógica
  
      this.http.put(`http://localhost:3002/noticias/${id}`, { titulo, contenido, autor_id }).subscribe(() => {
        const index = this.noticias.findIndex(n => n.id === id);
        if (index !== -1) {
          this.noticias[index] = { 
            id,
            titulo: titulo!,
            contenido: contenido!,
            nombre_autor: 'Desconocido',
            fecha_publicacion: this.noticias[index].fecha_publicacion 
          };
        }
        this.ngOnInit();
        this.closeEditModal();
      });
    }
  }  
*/

onEditSubmit() {
  if (this.currentNoticia) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas guardar los cambios?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar cambios',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const { id, titulo, contenido } = this.currentNoticia;
        const autor_id = 1; // Ajusta esto según tu lógica

        this.http.put(`http://localhost:3002/noticias/${id}`, { titulo, contenido, autor_id }).subscribe(() => {
          const index = this.noticias.findIndex(n => n.id === id);
          if (index !== -1) {
            this.noticias[index] = { 
              id,
              titulo: titulo!,
              contenido: contenido!,
              nombre_autor: 'Desconocido',
              fecha_publicacion: this.noticias[index].fecha_publicacion 
            };
          }
          this.ngOnInit();
          this.closeEditModal();
          Swal.fire('Guardado!', 'Los cambios han sido guardados.', 'success');
        });
      }
    });
  }
}


  confirmDelete() {
    if (this.noticiaToDelete) {
      const noticiaId = this.noticiaToDelete.id;
      this.http.delete(`http://localhost:3002/noticias/${noticiaId}`).subscribe(() => {
        const index = this.noticias.findIndex(n => n.id === noticiaId);
        if (index !== -1) {
          this.noticias.splice(index, 1);
        }
        this.closeDeleteModal();
      });
    }
  }

  onCreateSubmit() {
    const { titulo, contenido } = this.newNoticia;
    const autor_id = 1; // Suponiendo un autor_id estático por simplicidad, deberías ajustar esto según tu lógica

    this.http.post<{ id: number }>(`http://localhost:3002/noticias`, { titulo, contenido, autor_id }).subscribe(response => {
      const nuevaNoticia: Noticia = {
        id: response.id,
        titulo: titulo!,
        contenido: contenido!,
        nombre_autor: 'Desconocido', 
        fecha_publicacion: new Date().toISOString()
      };
      this.noticias.push(nuevaNoticia);
      this.ngOnInit(); 
      this.closeCreateModal();
    });
  }
/*
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, elimínalo!',
    cancelButtonText: 'No, cancelar!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Eliminado!', 'Tu archivo ha sido eliminado.', 'success');
    }
  });*/
/*
  confirmDelete() {
    if (this.noticiaToDelete) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínalo!',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const noticiaId = this.noticiaToDelete.id;
          this.http.delete(`http://localhost:3002/noticias/${noticiaId}`).subscribe(() => {
            const index = this.noticias.findIndex(n => n.id === noticiaId);
            if (index !== -1) {
              this.noticias.splice(index, 1);
            }
            this.closeDeleteModal();
            Swal.fire('Eliminado!', 'Tu archivo ha sido eliminado.', 'success');
          });
        }
      });
    }
  }*/
  
    deleteNews(noticia: Noticia) {
      this.noticiaToDelete = noticia;
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, elimínalo!',
        cancelButtonText: 'No, cancelar!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Llama al método de eliminación cuando el usuario confirma
          this.confirmDelete();
        } else {
          // Opcional: acciones si el usuario cancela
          this.showDeleteModal = false;
        }
      });
    }
  
}
