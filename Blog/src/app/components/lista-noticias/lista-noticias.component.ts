import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
    role: string;
  
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

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadNoticias();
    const storedRole = localStorage.getItem('userRole');
    console.log('Stored role:', storedRole); // Depuración
    this.role = storedRole;

  }

  loadNoticias() {
    this.http.get<Noticia[]>('https://3.147.61.80:3002/noticias').subscribe(data => {
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

        this.http.put(`https://3.147.61.80:3002/noticias/${id}`, { titulo, contenido, autor_id }).subscribe(() => {
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
      this.http.delete(`https://3.147.61.80:3002/noticias/${noticiaId}`).subscribe(() => {
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

    this.http.post<{ id: number }>(`https://3.147.61.80:3002/noticias`, { titulo, contenido, autor_id }).subscribe(response => {
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
    Swal.fire({
      title: 'Éxito',
      text: 'Noticia creada con éxito',
      icon: 'success',
    })
  }
    
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

  /*
    onCreateSubmit(): void {
      const { titulo, contenido } = this.newNoticia;
      const autor_id = this.authService.token(); // Obtén el ID del usuario autenticado
  
      if (!autor_id) {
        console.error('No se ha encontrado el ID del usuario.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se ha encontrado el ID del usuario.'
        });
        return;
      }
  
      this.http.post<{ id: number }>(`http://localhost:3002/noticias`, { titulo, contenido, autor_id }, { headers: this.authService.getHttpHeaders() }).subscribe(
        response => {
          const nuevaNoticia: Noticia = {
            id: response.id,
            titulo: titulo!,
            contenido: contenido!,
            nombre_autor: 'Desconocido', // Esto puede ser mejorado si obtienes el nombre del autor
            fecha_publicacion: new Date().toISOString()
          };
          this.noticias.push(nuevaNoticia);
          this.newNoticia = { titulo: '', contenido: '' }; // Limpiar el formulario
          this.closeCreateModal();
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Noticia creada con éxito.'
          });
        },
        error => {
          console.error('Error al crear la noticia:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema al crear la noticia. Por favor, inténtelo más tarde.'
          });
        }
      );
    }*/
}
