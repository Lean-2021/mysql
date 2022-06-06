# 1. Comienzo

#### Ejecutar en la terminal npm install para instalar las siguientes dependencias:

- Express
- Morgan
- Socket.io
- Ejs
- Knex
- Nodemon
- Mysql
- Sqlite3

## 2. Inicio Servidor

- Ejecutar npm start para levantar el servidor en el puerto local http://localhost:8080
  y crear las tablas productos en mysql, mensajes en sqlite3. Previamente tener instaladas estas bases de datos.
  Para conectar a la base de datos **ecommerce** mysql mariaDB el usuario es **root** y el password: **Admin1234**

### 3. Carga de Productos

- Utilizando el navegador de tu preferencia escribir la dirección http://localhost:8080
- Ingresar el titulo del producto a cargar en formato string (texto)
- Ingresar el precio del producto en formato number (numérico)
- Ingresar la URL de la imagen del producto en formato string (texto)

### 4. Centro de Mensajes

- Ingresar el **Email** con el cual desee escribir mensajes y luego el **mensaje** que desee enviar
- Desde cualquier otra ventana que escriba http://localhost:8080 podrá ver los mensajes y productos que se carguen y envien ,como asi también cargar productos y escribir mensajes
