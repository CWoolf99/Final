import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const mail = "cwoolf210799@gmail.com";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const nuevoUsuario = async (usuario) => {
  try {
    console.log(usuario);
    const info = await transporter.sendMail({
      from: mail,
      to: mail,
      subject: "nuevo usuario",
      html: `<h1>${usuario}</h1>`,
    });
  } catch (error) {
    console.log(error);
  }
};

const emailCompra = async (productos, email, user) => {
  console.log(productos.productos);
  try {
    const info = await transporter.sendMail({
      from: mail,
      to: email,
      subject: "Pedido en proceso",
      html: `<h1>${
        user.name
      } tu pedido ha sido realizado y se encuentra en proceso. Productos:${JSON.stringify(
        productos.productos
      )}</h1>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export { nuevoUsuario, emailCompra };
