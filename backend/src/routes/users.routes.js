import { Router } from "express";
import passport from "passport";

import {
  registerUser,
  failRegister,
  loginUser,
  logoutUser,
  updatePassword,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  return res.status(200).send({ status: "success", message: "Hello!" });
});

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
usersRouter.put("/resetPassword", updatePassword);
usersRouter.get("/logout", logoutUser);

export default usersRouter;
