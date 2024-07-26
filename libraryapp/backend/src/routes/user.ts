import express from "express";
import passport from "passport";

const apiUserRouter = express.Router();

const {
    userLogin,
    userRegister,
    userProfile,
} = require('../regulator/userApi');

apiUserRouter.get('/profile', userProfile);
apiUserRouter.post('/login', passport.authenticate('local', { failureMessage: 'Неправильный логин или пароль' }), userLogin);
apiUserRouter.post('/signup', userRegister);

export default apiUserRouter;