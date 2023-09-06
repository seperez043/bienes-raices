import express from "express";
import { formularioLogin, formularioRegistro, registrar, formulariooOlvidePassword } from '../controllers/usuarioController.js';
const router = express.Router();

//Rountig
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/olvide-password', formulariooOlvidePassword);

export default router;
