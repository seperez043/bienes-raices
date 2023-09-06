import {check, validationResult} from 'express-validator';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesión'
  });
}
const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crear cuenta'

  });
}
const registrar = async (req,res) =>{
  //Validadicion
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
 
  let resultado = validationResult(req)
  res.json(resultado.array());

  const usuario = await Usuario.create(req.body)
  res.json(usuario);
}
const formulariooOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso Bienes Raices'

  });
}

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formulariooOlvidePassword
}