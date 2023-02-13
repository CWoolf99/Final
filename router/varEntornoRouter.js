import express from "express";
import { getVarEntorno } from "../controllers/varEntornoController.js";

const { Router } = express;
const varEntornoRouter = Router();

varEntornoRouter.get("/", getVarEntorno);

export default varEntornoRouter;
