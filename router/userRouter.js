const { Router } = require("express");

const { registerUser, loginUser, profile } = require("../controllers/user")

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', profile)



module.exports = userRouter;