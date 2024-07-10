document.addEventListener('DOMContentLoaded', () => {
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    let currentRow;

    window.editNews = (button) => {
        currentRow = button.closest('tr');
        const title = currentRow.cells[0].innerText;
        const content = currentRow.cells[1].innerText;
        const author = currentRow.cells[2].innerText;

        document.getElementById('editTitle').value = title;
        document.getElementById('editContent').value = content;
        document.getElementById('editAuthor').value = author;

        editModal.style.display = 'block';
    };

    window.deleteNews = (button) => {
        currentRow = button.closest('tr');
        deleteModal.style.display = 'block';
    };

    // Cerrar modales
    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    closeDeleteModal.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    cancelDelete.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    // Confirmar eliminación
    confirmDelete.addEventListener('click', () => {
        currentRow.remove();
        deleteModal.style.display = 'none';
    });

    // Guardar cambios de edición
    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newTitle = document.getElementById('editTitle').value;
        const newContent = document.getElementById('editContent').value;
        const newAuthor = document.getElementById('editAuthor').value;

        currentRow.cells[0].innerText = newTitle;
        currentRow.cells[1].innerText = newContent;
        currentRow.cells[2].innerText = newAuthor;

        editModal.style.display = 'none';
    });

    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    });
});

