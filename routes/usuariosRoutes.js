import express from "express";
import { formularioLogin, formularioRegistro, formulariooOlvidePassword } from '../controllers/usuarioController.js';
const router = express.Router();

//Rountig
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.get('/olvide-password', formulariooOlvidePassword);

export default router;
