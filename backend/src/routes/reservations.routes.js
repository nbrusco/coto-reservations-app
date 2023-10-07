import { Router } from "express";
import passport from 'passport'

import { verifyRole } from "../middlewares/auth.js";

import {
  getReservation,
  getReservations,
  getReservationsByEmail,
  appointReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservations.controller.js";

const reservationsRouter = Router();

reservationsRouter.get(
  "/",
  (req, res, next) => verifyRole(req, res, next, ["admin"]),
  getReservations
);
reservationsRouter.get(
  "/:rid",
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  getReservation
);
reservationsRouter.get(
  "/appointments/:email",
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  getReservationsByEmail
);

reservationsRouter.post(
  "/",
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  appointReservation
);
reservationsRouter.put(
  "/:rid",
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  updateReservation
);
reservationsRouter.delete(
  "/:rid",
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  deleteReservation
);

export default reservationsRouter;