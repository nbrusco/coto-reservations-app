import mongoose from "mongoose";

const reservationCollection = "Reservations";

const reservationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  guestQuantity: {
    type: Number,
    required: true,
  },
  commentaries: String,
});

export const reservationModel = mongoose.model(
  reservationCollection,
  reservationSchema
);
