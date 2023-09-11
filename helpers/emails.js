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

    //
    await transport.sendMail({
        from: 'seperez043@gmail.com',
        to: email,
        subject: 'Confirma tu cuenta en bienesraices.com',
        text: 'Confirma tu cuenta en bienesraices.com',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en bienesrainces.com</p>

               <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:

               <a href=""Confirma tu cuenta</a> </p>
                
               <p> Si tu no creaste esta cuenta, puedes ignoral el mensaje</p>`
    })
}

export {
    emailRegistro
}