import { Router } from "express";

import {
  getReservation,
  getReservations,
  getReservationsByEmail,
  appointReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservations.controller.js";

const reservationsRouter = Router();

reservationsRouter.get("/", getReservations);
reservationsRouter.get("/:rid", getReservation);
reservationsRouter.get("/appointments/:email", getReservationsByEmail);

reservationsRouter.post("/", appointReservation);
reservationsRouter.put("/:rid", updateReservation);
reservationsRouter.delete("/:rid", deleteReservation);

export default reservationsRouter;
