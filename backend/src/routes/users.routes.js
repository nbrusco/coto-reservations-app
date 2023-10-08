import { Router } from "express";
import passport from "passport";

import {
  registerUser,
  failRegister,
  loginUser,
  logoutUser,
  updatePassword,
  restorePasswordProcess,
  getUserWithToken
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUserWithToken);

usersRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/v1/users/failRegister",
  }),
  registerUser
);

usersRouter.get("/failRegister", failRegister);
usersRouter.post("/login", loginUser);
usersRouter.post("/restore", restorePasswordProcess);
usersRouter.put("/resetPassword", updatePassword);
usersRouter.get("/logout", logoutUser);

export default usersRouter;
