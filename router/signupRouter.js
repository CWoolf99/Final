import express from "express";
import passport from "passport";
import {
  getErrorSignup,
  getSignup,
  postSignup,
} from "../controllers/signupController.js";

const { Router } = express;
const registerRouter = Router();

registerRouter.get("/", getSignup);

registerRouter.post(
  "/",
  passport.authenticate("signup", { failureRedirect: "/signup/errorRegister" }),
  postSignup
);

registerRouter.get("/errorRegister", getErrorSignup);

export default registerRouter;
