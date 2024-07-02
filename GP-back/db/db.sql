CREATE DATABASE db_tareas;

USE db_tareas;

CREATE TABLE usuario (
    id_u INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50),
    correo VARCHAR(50),
    contrasena VARCHAR(100),
    resetToken VARCHAR(255) DEFAULT NULL,
    resetExpires DATETIME DEFAULT NULL,
    estado_u INT DEFAULT 1,
    FOREIGN KEY (estado_u) REFERENCES estado_u(id_e)
);

CREATE TABLE estado_u (
    id_e INT PRIMARY KEY,
    estado VARCHAR(10)
);
INSERT INTO estado_u
(`id_e`,
`estado`)
VALUES
(1, "Activo"),
(2, "Inactivo");



CREATE TABLE proyecto (
	id_p INT PRIMARY KEY AUTO_INCREMENT,
    id_u INT,
    nom_p VARCHAR(50),
    des_p VARCHAR(100),
    fecha_i datetime,
    fecha_f datetime,
    FOREIGN KEY (id_u) REFERENCES usuario(id_u)
);

CREATE TABLE integrantes (
	id_p INT,
    id_u INT,
    FOREIGN KEY (id_p) REFERENCES proyecto(id_p),
    FOREIGN KEY (id_u) REFERENCES usuario(id_u)
);

CREATE TABLE actividad (
	id_a INT PRIMARY KEY AUTO_INCREMENT,
    id_p INT,
    id_u INT,
    nom_a VARCHAR(50),
    des_a VARCHAR(100),
    estado INT DEFAULT 3,
    fecha_fin datetime,
    notas VARCHAR(200),
    FOREIGN KEY (id_p) REFERENCES proyecto(id_p),
    FOREIGN KEY (id_u) REFERENCES usuario(id_u),
    FOREIGN KEY (estado) REFERENCES estado_act(id_e)
    
);

CREATE TABLE estado_act (
id_e INT PRIMARY KEY,
nom_e VARCHAR(15)
);
INSERT INTO estado_act
(`id_e`,
`nom_e`)
VALUES
(1, "Terminada"),
(2, "En Pausa"),
(3, "Sin Finalizar");
