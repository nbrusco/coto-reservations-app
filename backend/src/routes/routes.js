import { Router } from "express";

import usersRouter from "./users.routes.js";
import reservationsRouter from "./reservations.routes.js";

const routerAPI = (app) => {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/reservations", reservationsRouter);
};

export default routerAPI;
