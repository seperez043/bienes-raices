import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword
} from '../controllers/usuarioController.js';
const router = express.Router();

//Rountig
router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);


//Almacena el nuevo password

router.get('/olvide-password/:token', comprobarToken);
router.get('/olvide-password/:token', nuevoPassword);

export default router;
