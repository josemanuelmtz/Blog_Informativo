-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS Blog;

-- Usar la base de datos creada
USE Blog;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuario (
    id_u INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50),
    correo VARCHAR(50),
    contrasena VARCHAR(100)
);

-- Tabla de Noticias
CREATE TABLE IF NOT EXISTS noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    autor_id INT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuario(id_u)
);

-- Tabla de Comentarios
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT,
    usuario_id INT,
    noticia_id INT,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_u),
    FOREIGN KEY (noticia_id) REFERENCES noticias(id)
);

CREATE TABLE IF NOT EXISTS reportes_comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
	motivo TEXT,
    comentario_id INT,
    usuario_reporte_id INT,
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comentario_id) REFERENCES comentarios(id),
    FOREIGN KEY (usuario_reporte_id) REFERENCES usuario(id_u)
);
select*from usuario;
INSERT INTO usuario (usuario, correo, contrasena) VALUES ('Juan', 'juan@gmail.com', '123456');
