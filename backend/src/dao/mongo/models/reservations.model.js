import mongoose from "mongoose";

const reservationCollection = "Reservations";

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  commentaries: String,
});

export const reservationModel = mongoose.model(
  reservationCollection,
  reservationSchema
);
