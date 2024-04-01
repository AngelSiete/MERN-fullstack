import nodemailer from 'nodemailer';

const emailRegistro = async (data) => {
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
        subject: 'Confirma cuenta',
        text: 'Confirma cuenta',
        html: `<p>Hola ${nombre}</p> pincha <a href="${process.env.FRONTEND_URL}/confirmar/${token}">aquí</a> para confirmar tu cuenta:`
      });

      console.log('mensaje enviado: ', info.message)
};

export default emailRegistro;