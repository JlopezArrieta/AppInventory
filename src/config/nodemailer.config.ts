import nodemailer from 'nodemailer';

import * as dotenv from 'dotenv';
dotenv.config();

const { CORREO_ELECTRONICO, CONTRASENAAPP } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: CORREO_ELECTRONICO,
    pass: CONTRASENAAPP
  }
});

export const sendEmail = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: CORREO_ELECTRONICO,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo: ', error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
};



