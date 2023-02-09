import { infoLogger } from "../services/logger/logger.js";
import { nuevoUsuario } from "../services/mailer/mailer.js";
import generateToken from "../services/auth/auth.js";

function getSignup ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('signUp')
}

function postSignup ( req , res )  {
    const { username , password } = req.body
    const user = { username:username , password:password }
    nuevoUsuario(user)
    const access_token = generateToken( user )
    res.json( {access_token} )
}

function getErrorSignup ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorSignUp')
}

export { getSignup , postSignup , getErrorSignup }