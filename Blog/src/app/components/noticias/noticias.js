// script.js
document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;

    // Aquí podrías añadir la lógica para guardar la noticia, por ejemplo, enviándola a un servidor.
    console.log({
        title: title,
        content: content,
        author: author,
        date: date
    });

    // Limpiar el formulario después de enviarlo
    document.getElementById('newsForm').reset();
});
