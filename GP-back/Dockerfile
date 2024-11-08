FROM node:18.17.1-alpine

# Configura el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package-lock.json .
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia el proyecto completo al contenedor
COPY . .

# Expón el puerto (por ejemplo, 8080 o 3000 según tu configuración)
EXPOSE 8080

# Ejecuta la aplicación
CMD ["node", "index.js", "db.js"]
