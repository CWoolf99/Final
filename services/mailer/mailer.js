import { createTransport } from 'nodemailer';
import twilio from 'twilio';
import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';

const mail = 'cwoolf210799@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user:'cwoolf210799@gmail.com',
        pass:process.env.PASS
    }
})

const nuevoUsuario = async (usuario) => {
    try{
        const info = await transporter.sendMail({
            from: mail,
            to: mail,
            subject: 'nuevo usuario',
            html: `<h1>${usuario}</h1>`})
        console.log(info)
    }
    catch (error){
        console.log(error)
    }
}

const emailCompra = async (productos , email , user) => {
    try{
        const info = await transporter.sendMail({
            from: mail,
            to: email,
            subject: 'Pedido en proceso',
            html: `<h1>${user} tu pedido ha sido realizado y se encuentra en proceso. Productos:${productos}</h1>`})
        console.log(info)
    }
    catch (error){
        console.log(error)
    }
}

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid , authToken)

const compraRealizada = async (numero , productos , user) => {
    try{
        const message = await client.messages.create({
            body: `${user} tu pedido ha sido realizado y se encuentra en proceso. Productos:${productos}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${numero}`
        })
        console.log(message)
    }
    catch (error){
        console.log(error)
    }
}

export { nuevoUsuario , emailCompra ,compraRealizada };