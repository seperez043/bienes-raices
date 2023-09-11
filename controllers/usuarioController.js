import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from '../helpers/emails.js';


const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
  });
};

const registrar = async (req, res) => {
  //Validadicion
  await check("nombre")
    .notEmpty()
    .withMessage("Nombre no puede estar vacio")
    .run(req);
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener por los menos 8 caracteres")
    .run(req);
  // await check('repetir_password').equals('password').withMessage('Las contraseñas no coiciden').run(req)

  let resultado = validationResult(req);
  console.log("resultado.array()", resultado.array());
  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  //Extraer los datos
  const { nombre, email, password } = req.body;

  //Verificar si el usuario esta duplicado
  const existeUsuario = await Usuario.findOne({ where: { email: email } });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: [{ msg: "El usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Almacenar un usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
  });

  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    password: usuario.password,
    token: usuario.password
  });

  //Mostrar mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje: 'Hemos enviado un email de confirmacion, presina en el enlace'
  })
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso Bienes Raices",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
};
