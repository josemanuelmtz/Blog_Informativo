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
select*from noticias;
INSERT INTO usuario (usuario, correo, contrasena) VALUES ('Juan', 'juan@gmail.com', '123456');
-- Insertar noticias
INSERT INTO noticias (titulo, contenido, autor_id) VALUES 
('NASA Discovers New Exoplanet', 'NASA has announced the discovery of a new exoplanet that may be capable of supporting life. The planet, named Kepler-1649c, is located in the habitable zone of its star and is similar in size and temperature to Earth.', 1),
('Economic Growth Expected to Slow in 2024', 'Economists predict that global economic growth will slow in 2024 due to various factors including rising inflation and geopolitical tensions. However, some regions may experience more growth than others.', 1),
('New Tech Innovations Unveiled at CES 2024', 'The Consumer Electronics Show (CES) 2024 in Las Vegas showcased a range of new technology innovations, including advancements in AI, virtual reality, and smart home devices.', 1);
