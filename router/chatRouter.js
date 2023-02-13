import express from "express";
import passport from "passport";

import { getChat, getMyChat } from "../controllers/chatController.js";

const { Router } = express;

const chatRouter = Router();

chatRouter.get("/", passport.authenticate("jwt", { session: false }), getChat);

chatRouter.get("/:email", getMyChat);

export { chatRouter };
