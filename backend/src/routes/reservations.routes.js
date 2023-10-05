import { Router } from "express";

const reservationsRouter = Router();

reservationsRouter.get("/", () => {console.log("hello!")});

export default reservationsRouter;
