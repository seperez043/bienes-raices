import express from 'express';
import usuarioRoutes from './routes/usuariosRoutes.js';
//const express = require('express');

//Crear la app
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');
app.set('views', './views' );

//Carpeta Pública
app.use( express.static('public'));

app.use('/auth', usuarioRoutes);

//Definir un puerto y arrancar el proyecto
const port = 4000;

app.listen(port, () => {
  console.log(`El Servidor esta funcionando en el puerto ${port}`);
});