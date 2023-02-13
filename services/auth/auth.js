import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import User from "../../persistencia/models/user.js";

dotenv.config();

async function connect() {
  await mongoose.connect(process.env.MONGO, {
    serverSelectionTimeoutMS: 10000,
  });
  return console.log("mongo conectado");
}

connect();

const PRIVATE_KEY = "myprivatekey";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
opts.secretOrKey = PRIVATE_KEY;

passport.use(
  "jwt",
  new Strategy(opts, function (jwt_payload, done) {
    User.findOne({ email: jwt_payload.data.email }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (error, user) => {
      if (error) return done(error);
      if (!user)
        return done(null, false, {
          message: "Usuario y/o contraseña incorrectos",
        });
      if (!isValidPassword(user, password))
        return done(null, false, {
          message: "Usuario y/o contraseña incorrectos",
        });
      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ email: username }, (error, user) => {
        if (error)
          return done(error, user, {
            message: "Error al intentar registrar el usuario",
          });
        if (user) return done(null, false, { message: "El usuario ya existe" });
        const newUser = {
          email: username,
          password: createHash(password),
          name: req.body.name,
          adress: req.body.adress,
          number: req.body.number,
          isAdmin: req.body.isAdmin,
        };
        User.create(newUser, (error, userWithId) => {
          if (error)
            return done(error, user, { message: "Error creando usuario" });
          return done(null, userWithId, { message: "Usuario registrado" });
        });
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

function generateToken(user) {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, {
    expiresIn: process.env.DURACION,
  });
  return token;
}

export default generateToken;
