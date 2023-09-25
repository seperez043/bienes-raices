import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro, olvidePassword } from '../helpers/emails.js';

//Formulario para iniciar sesión
const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
    csrfToken: req.csrfToken()
  });
};

//Formulario de registro de usuario
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
    csrfToken: req.csrfToken()
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
  await check('repetir_password').equals('password').withMessage('Las contraseñas no coiciden').run(req)

  let resultado = validationResult(req);
  console.log("resultado.array()", resultado.array());

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
    token: usuario.token
  });

  //Mostrar mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    csrfToken: req.csrfToken(),
    mensaje: 'Hemos enviado un email de confirmacion, presina en el enlace'
  })
}

//Funcion que comprueba una cuenta
const confirmar = async (req, res) => {

  const { token } = req.params;

  //Virificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error al confirmar tu cuenta',
      mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      csrfToken: req.csrfToken(),
      error: true
    })
  }

  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render('auth/confirmar-cuenta', {
    csrfToken: req.csrfToken(),
    pagina: 'Cuenta confirmada',
    mensaje: 'La cuenta se confirmo correctamente'

  })
}

//Formulario de para restablecer contraseña
const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso Bienes Raices",
    csrfToken: req.csrfToken(),
  });

}

const resetPassword = async (req, res) => {

  //Validacion
  await check("email").isEmail().withMessage("Eso no parece un email").run(req)
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso Bienes Raices",
      csrfToken: req.csrfToken(),
      errores: resultado.array()

    });

  }
  //Buscar usuario

  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso Bienes Raices",
      csrfToken: req.csrfToken(),
      errores: [{ msg: 'El email no pertenece a ningun usuario' }]

    });

  }
  //General un token y enviar email

  const samir = usuario.token = generarId();
  await usuario.save();

  //Enviar email
  olvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
  })
  //Mostrar mensaje
  res.render('templates/mensaje', {
    pagina: 'Restablece tu password',
    csrfToken: req.csrfToken(),
    mensaje: 'Hemos enviado un email con las instruciones, presina en el enlace'
  })

}

const comprobarToken = async (req, res, next) => {

  const { token } = req.params

  const usuario = await Usuario.findOne({ where: { token } })

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Reestablece tu password',
      mensaje: 'Hubo un error al validar tu informacioóm, intenta de nuevo',
      csrfToken: req.csrfToken(),
      error: true
    })
  }

  // Mostrar formulario para modificar el password
  res.render('auth/reset-password', {
    pagina: 'Restacblece tu password'
  })
}

const nuevoPassword = (req, res, next) => {

}



//Exportar funciones
export {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword
};
