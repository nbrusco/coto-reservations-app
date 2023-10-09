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
  getOccupiedDates,
} from "../controllers/reservations.controller.js";

const reservationsRouter = Router();

reservationsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["admin"]),
  getReservations
);
reservationsRouter.get(
  "/:rid",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  getReservation
);
reservationsRouter.get(
  "/appointments/:email",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  getReservationsByEmail
);
reservationsRouter.get(
  "/dates/occupied",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  getOccupiedDates
);

reservationsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  appointReservation
);
reservationsRouter.put(
  "/:rid",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  updateReservation
);
reservationsRouter.delete(
  "/:rid",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin"]),
  deleteReservation
);

export default reservationsRouter;