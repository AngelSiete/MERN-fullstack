import nodemailer from 'nodemailer';

const emailOlvidePassword = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre, token} = data;
      const info = await transport.sendMail({
        from: 'APV',
        to: email,
        subject: 'Reestablece tu contraseña',
        text: 'Reestablece tu contraseña',
        html: `<p>Hola ${nombre}</p> has solicitado reestablecer tu password: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">pincha aquí</a>`
      });

      console.log('mensaje enviado: ', info.message)
};

export default emailOlvidePassword;