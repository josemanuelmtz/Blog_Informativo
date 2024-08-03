import { Component, OnInit } from '@angular/core';
import { NewsService, Noticia } from '../../services/news.service'; // Asegúrate de importar Noticia
import Swal from 'sweetalert2';

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
  newNoticia: Partial<Noticia> = {}; 
  notificationMessage: string = '';
  role: string | null = null;
  
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    const storedRole = localStorage.getItem('userRole');
    console.log('Stored role:', storedRole); // Depuración
    // Suscribirse al observable para recibir actualizaciones
    this.newsService.noticias$.subscribe(data => {
      this.noticias = data;
    });
  }

  editNews(noticia: Noticia) {
    this.currentNoticia = { ...noticia };
    if (this.currentNoticia) {
      this.showEditModal = true;
    }
  }

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
        this.newsService.deleteNoticia(noticia.id);
        Swal.fire('Eliminado!', 'La noticia ha sido eliminada.', 'success');
      } else {
        this.showDeleteModal = false;
      }
    });
  }

  openCreateModal() {
    this.newNoticia = {}; 
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
          this.newsService.updateNoticia(this.currentNoticia);
          this.closeEditModal();
          Swal.fire('Guardado!', 'Los cambios han sido guardados.', 'success');
        }
      });
    }
  }

  onCreateSubmit() {
    const { titulo, contenido } = this.newNoticia;
    this.newsService.addNoticia({ titulo, contenido, autor_id: 1 }).subscribe(() => {
      this.notificationMessage = 'Nueva noticia agregada'; // Set the notification message
      this.closeCreateModal();
      this.newNoticia = {}; 
    }, error => {
      this.notificationMessage = 'Error al agregar la noticia'; 
    });
  }
}


