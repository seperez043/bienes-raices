import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }

  });

  const { email, nombre, token } = datos;

  //Envio de correo electronico
  await transport.sendMail({
    from: 'seperez043@gmail.com',
    to: email,
    subject: 'Restable tu password en bienesraices.com',
    text: 'Restable tu password  en bienesraices.com',
    html: `<p>Hola ${nombre}, has solicitado restabler tu passwrod en bienesrainces.com</p>

               <p> Sigue: Sigue el siguiente enlace para generar un password nuevo
               </p> 
               <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/olvide-password/${token}">Restablecer password </a> </p>

               <p> Si tu no solicitaste el cambio de password, puedes ignoral el mensaje</p>`
  })
}

const olvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }

  });

  const { email, nombre, token } = datos;

  //Envio de correo electronico
  await transport.sendMail({
    from: 'seperez043@gmail.com',
    to: email,
    subject: 'Confirma tu cuenta en bienesraices.com',
    text: 'Confirma tu cuenta en bienesraices.com',
    html: `<p>Hola ${nombre}, comprueba tu cuenta en bienesrainces.com</p>

               <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:

               <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">Confirmar Cuenta </a> </p>

               <p> Si tu no creaste esta cuenta, puedes ignoral el mensaje</p>`
  })
}

export {
  emailRegistro,
  olvidePassword
}