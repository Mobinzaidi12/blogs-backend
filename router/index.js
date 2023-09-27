const { Router } = require("express");
const userRouter = require("./userRouter");
const blogRouter = require("./blogRouter");

const appRouter = Router()

appRouter.use('/user', userRouter);
appRouter.use("/blog", blogRouter);


module.exports = appRouter