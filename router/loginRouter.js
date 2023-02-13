import express from "express";
import passport from "passport";

import {
  getErrorLogin,
  getLogin,
  postLogin,
} from "../controllers/loginController.js";

const { Router } = express;
const loginRouter = Router();

loginRouter.get("/", getLogin);

loginRouter.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/errorLogin" }),
  postLogin
);

loginRouter.get("/errorLogin", getErrorLogin);

export default loginRouter;
