# Utilizar la imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias incluyendo bcryptjs
RUN npm install bcryptjs

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Copia el archivo .env
COPY .env .env

# Construir la aplicación NestJS
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]

