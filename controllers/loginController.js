import generateToken  from "../services/auth/auth.js";
import { infoLogger } from "../services/logger/logger.js";

function getLogin ( req , res ) {
    res.render( "formLogin" )
};

function postLogin ( req , res ) {
    const { username , password } = req.body
    let user = { username:username , password:password }
    let access_token = generateToken( user )
    res.json( {access_token} )
};

function getErrorLogin ( req , res ) {
    const {url , method} = req
    infoLogger.info(`Ruta ${method} ${url} recibida`)
    res.render('errorLogin')
}

export { getLogin , postLogin , getErrorLogin }