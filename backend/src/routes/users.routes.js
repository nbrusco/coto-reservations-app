import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", () => {console.log("hello!")});

export default usersRouter;
