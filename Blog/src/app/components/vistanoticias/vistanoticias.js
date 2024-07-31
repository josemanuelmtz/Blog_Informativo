function addNewsItem(id, titulo, contenido, autor_id, fecha_publicacion) {
    const newsContainer = document.getElementById('newsContent');

    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const newsTitle = document.createElement('h2');
    newsTitle.textContent = titulo;

    const newsDate = document.createElement('div');
    newsDate.classList.add('date');
    newsDate.textContent = new Date(fecha_publicacion).toLocaleDateString();

    const newsContent = document.createElement('p');
    newsContent.textContent = contenido;

    const newsAuthor = document.createElement('div');
    newsAuthor.classList.add('author');
    newsAuthor.textContent = `Escrito por ${autor_id}`;

    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsDate);
    newsItem.appendChild(newsContent);
    newsItem.appendChild(newsAuthor);

    newsContainer.appendChild(newsItem);
}

// Simulación de datos de noticias obtenidos desde Angular
document.addEventListener('DOMContentLoaded', function() {
    const noticias = [
        {
            id: 1,
            titulo: 'Noticia 1',
            contenido: 'Contenido de la noticia 1',
            autor_id: 'Autor 1',
            fecha_publicacion: '2024-07-26T12:34:56Z'
        },
        {
            id: 2,
            titulo: 'Noticia 2',
            contenido: 'Contenido de la noticia 2',
            autor_id: 'Autor 2',
            fecha_publicacion: '2024-07-26T12:34:56Z'
        }
        // Añade más noticias si es necesario
    ];

    noticias.forEach(noticia => {
        addNewsItem(noticia.id, noticia.titulo, noticia.contenido, noticia.autor_id, noticia.fecha_publicacion);
    });
});
