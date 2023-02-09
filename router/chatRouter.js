import express from "express";

const { Router } = express;

const chatRouter = Router();

chatRouter.get( "/" , ( req , res ) => {
    res.render( "chat" , {} )
})

export { chatRouter };