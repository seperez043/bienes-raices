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
const formulariooOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso Bienes Raices'

  });
}

export {
  formularioLogin,
  formularioRegistro,
  formulariooOlvidePassword
}