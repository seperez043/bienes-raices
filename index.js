import express from 'express';
import usuarioRoutes from './routes/usuariosRoutes.js';
import db from './config/db.js'
//const express = require('express');

//Crear la app
const app = express();

//Habiliatar lectura de datos del formulario
app.use( express.urlencoded({extended: true}) );

//Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión correcta a la base de datos');
}catch (error){
  console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta Pública
app.use(express.static('public'));

app.use('/auth', usuarioRoutes);

//Definir un puerto y arrancar el proyecto
const port = 4000;

app.listen(port, () => {
  console.log(`El Servidor esta funcionando en el puerto ${port}`);
});