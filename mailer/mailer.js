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
const accountSid = 'AC7a3606094faf146bb84f07f26c61fb17';
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid , authToken)

const compraRealizada = async (numero) => {
    try{
        const message = await client.messages.create({
            body: 'Tu pedido ha sido realizado y se encuentra en proceso',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+525534660887'
        })
        console.log(message)
    }
    catch (error){
        console.log(error)
    }
}

export { nuevoUsuario , compraRealizada };